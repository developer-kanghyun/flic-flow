import { useState, useEffect, useCallback } from "react";
import {
  getContentDetail,
  getContentCredits,
  getContentRecommendations,
  getContentVideos,
  getContentWatchProviders,
} from "@src/api/tmdbApi";
import { fetchIMDBId, fetchOMDBRatings } from "@src/services/omdbApi";
import Movie from "@src/types/Movie";
import type { Credits, Video, WatchProviderDetails } from "@src/types/api";
import type { MediaType, LoadingState } from "@src/types/common";
import { getUserErrorMessage } from "@src/utils/apiErrorHandler";

interface UseMovieDetailReturn {
  movie: Movie | null;
  credits: Credits | null;
  recommendations: Movie[];
  hasTrailer: boolean;
  ratings: {
    imdbRating: string | null;
    rottenTomatoesRating: string | null;
  };
  watchProviders: WatchProviderDetails | null;
  loadingState: LoadingState;
  refetch: () => void;
}

export const useMovieDetail = (
  contentId: string | undefined,
  mediaType: MediaType | null
): UseMovieDetailReturn => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [hasTrailer, setHasTrailer] = useState(false);
  const [ratings, setRatings] = useState<{
    imdbRating: string | null;
    rottenTomatoesRating: string | null;
  }>({
    imdbRating: null,
    rottenTomatoesRating: null,
  });
  const [watchProviders, setWatchProviders] = useState<WatchProviderDetails | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    error: null,
  });

  const fetchMovieDetail = useCallback(async () => {
    if (!contentId) {
      setLoadingState({
        isLoading: false,
        error: "잘못된 영화 ID입니다.",
      });
      return;
    }

    const numericId = parseInt(contentId, 10);
    if (isNaN(numericId)) {
      setLoadingState({
        isLoading: false,
        error: "잘못된 영화 ID 형식입니다.",
      });
      return;
    }

    setLoadingState({ isLoading: true, error: null });

    try {
      // 병렬로 모든 데이터 요청
      const [movieData, creditsData, recommendationsData, videosData, providersData] = 
        await Promise.allSettled([
          getContentDetail(numericId, mediaType || undefined),
          getContentCredits(numericId, mediaType || undefined),
          getContentRecommendations(numericId, mediaType || undefined),
          getContentVideos(numericId, mediaType || undefined),
          getContentWatchProviders(numericId, mediaType || undefined),
        ]);

      // 기본 영화 정보 처리 (필수)
      if (movieData.status === 'fulfilled') {
        setMovie(movieData.value);
      } else {
        throw new Error('영화 정보를 불러올 수 없습니다.');
      }

      // 크레딧 정보 처리
      if (creditsData.status === 'fulfilled') {
        setCredits(creditsData.value);
      } else {
        console.warn('크레딧 정보를 불러오지 못했습니다:', creditsData.reason);
        setCredits(null);
      }

      // 추천 영화 처리
      if (recommendationsData.status === 'fulfilled') {
        setRecommendations(recommendationsData.value);
      } else {
        console.warn('추천 영화를 불러오지 못했습니다:', recommendationsData.reason);
        setRecommendations([]);
      }

      // 비디오/트레일러 처리
      if (videosData.status === 'fulfilled') {
        const trailers = videosData.value.filter((video: Video) =>
          video.type === 'Trailer' && video.site === 'YouTube'
        );
        setHasTrailer(trailers.length > 0);
      } else {
        console.warn('비디오 정보를 불러오지 못했습니다:', videosData.reason);
        setHasTrailer(false);
      }

      // 시청 제공업체 처리
      if (providersData.status === 'fulfilled') {
        setWatchProviders(providersData.value);
      } else {
        console.warn('시청 제공업체 정보를 불러오지 못했습니다:', providersData.reason);
        setWatchProviders(null);
      }

      // IMDB/Rotten Tomatoes 평점 가져오기 (실패해도 무시)
      if (movieData.status === 'fulfilled') {
        try {
          const imdbId = await fetchIMDBId(movieData.value.id);
          if (imdbId) {
            const omdbRatings = await fetchOMDBRatings(imdbId);
            if (omdbRatings) {
              setRatings(omdbRatings);
            }
          }
        } catch (error) {
          console.warn('외부 평점 정보를 불러오지 못했습니다:', error);
        }
      }

      setLoadingState({ isLoading: false, error: null });
    } catch (error) {
      console.error('Error fetching movie details:', error);
      setLoadingState({
        isLoading: false,
        error: getUserErrorMessage(error),
      });
    }
  }, [contentId, mediaType]);

  const refetch = useCallback(() => {
    fetchMovieDetail();
  }, [fetchMovieDetail]);

  useEffect(() => {
    fetchMovieDetail();
  }, [fetchMovieDetail]);

  return {
    movie,
    credits,
    recommendations,
    hasTrailer,
    ratings,
    watchProviders,
    loadingState,
    refetch,
  };
};