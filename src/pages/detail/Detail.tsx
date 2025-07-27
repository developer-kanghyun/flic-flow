import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { 
  StyledDetailPage,
  HeroSection,
  HeroBackdrop,
  HeroOverlay,
  HeroContent,
  PlayButton,
  ContentContainer,
  MainContent,
  Sidebar,
  MetadataCard,
  CastCard,
  RecommendationsSection
} from "./styles";
import { WatchListButton, MovieCarousel, VideoModal } from "@components/index";
import { getContentDetail, getContentCredits, getContentRecommendations, getContentVideos, getContentWatchProviders, OTT_SEARCH_URLS } from "@src/api/tmdbApi";
import { fetchIMDBId, fetchOMDBRatings } from "@src/services/omdbApi";
import Movie from "@src/types/Movie";
import type { Credits, Video, WatchProviderDetails } from "@src/types/api";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const contentId = id;
  const mediaType = searchParams.get('type') as 'movie' | 'tv' | null;
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [hasTrailer, setHasTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [ratings, setRatings] = useState<{
    imdbRating: string | null;
    rottenTomatoesRating: string | null;
  }>({
    imdbRating: null,
    rottenTomatoesRating: null
  });
  const [watchProviders, setWatchProviders] = useState<WatchProviderDetails | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!contentId) {
        setError("콘텐츠 ID가 없습니다.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [movieData, creditsData, recommendationsData, videosData, watchProvidersData] = await Promise.all([
          getContentDetail(Number(contentId), mediaType || undefined),
          getContentCredits(Number(contentId), mediaType || undefined),
          getContentRecommendations(Number(contentId), mediaType || undefined),
          getContentVideos(Number(contentId), mediaType || undefined),
          getContentWatchProviders(Number(contentId), mediaType || undefined)
        ]);
        
        setMovie(movieData);
        setCredits(creditsData);
        setRecommendations(recommendationsData);
        setWatchProviders(watchProvidersData);
        
        // 예고편 존재 여부 확인
        const trailer = videosData.find(
          (video: Video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setHasTrailer(!!trailer);
        
        // IMDB와 로튼토마토 점수 가져오기
        try {
          const imdbId = await fetchIMDBId(movieData.id);
          if (imdbId) {
            const omdbRatings = await fetchOMDBRatings(imdbId);
            if (omdbRatings) {
              setRatings({
                imdbRating: omdbRatings.imdbRating,
                rottenTomatoesRating: omdbRatings.rottenTomatoesRating
              });
            }
          }
        } catch (ratingsError) {
          console.error('Error fetching ratings:', ratingsError);
        }
      } catch (err) {
        console.error("Error fetching content data:", err);
        setError("콘텐츠 상세 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [contentId, mediaType]);

  if (loading) return <p>영화 상세 정보 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <p>영화 정보를 찾을 수 없습니다.</p>;

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const director = credits?.crew.find(person => person.job === 'Director');
  const mainCast = credits?.cast.slice(0, 6) || [];

  return (
    <StyledDetailPage>
      {/* 히어로 섹션 */}
      <HeroSection>
        {backdropUrl && (
          <HeroBackdrop 
            src={backdropUrl} 
            alt={movie.title || movie.name}
          />
        )}
        <HeroOverlay />
        {hasTrailer && (
          <PlayButton onClick={() => setIsVideoModalOpen(true)}>
            <button className="play-circle">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <span className="play-text">예고편 보기</span>
          </PlayButton>
        )}
        <HeroContent>
          <div className="hero-text">
            <h1>{movie.title || movie.name}</h1>
            <div className="hero-meta">
              <div className="watchlist-wrapper">
                <WatchListButton movieId={movie.id} />
              </div>
              <div className="imdb-rating">
                <span className="imdb-label">IMDB</span>
                <span className="rating-score">
                  {ratings.imdbRating || movie.vote_average?.toFixed(1) || '8.2'}
                </span>
              </div>
              <div className="rotten-tomatoes">
                <span className="rt-label">🍅</span>
                <span className="rt-score">
                  {ratings.rottenTomatoesRating || `${Math.round((movie.vote_average || 8.2) * 8.5)}%`}
                </span>
              </div>
              <span className="release-year">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 
                 movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : '2024'}
              </span>
              {director && (
                <span className="director">감독: {director.name}</span>
              )}
            </div>
            <p className="overview">{movie.overview}</p>
            <div className="hero-actions">
              {watchProviders && watchProviders.flatrate && watchProviders.flatrate.length > 0 && (
                (() => {
                  // Netflix Standard with Ads 제외한 첫 번째 스트리밍 서비스
                  const streamingProviders = watchProviders.flatrate.filter(
                    provider => !provider.provider_name.includes('Standard with Ads')
                  );
                  
                  if (streamingProviders.length === 0) return null;
                  
                  const firstProvider = streamingProviders[0];
                  const ottSearchBaseUrl = OTT_SEARCH_URLS[firstProvider.provider_name];
                  const finalLink = ottSearchBaseUrl 
                    ? `${ottSearchBaseUrl}${encodeURIComponent(movie.title || movie.name || "")}`
                    : watchProviders.link;
                  
                  return (
                    <a 
                      href={finalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ott-link-button"
                    >
                      {firstProvider.provider_name}에서 시청
                    </a>
                  );
                })()
              )}
            </div>
          </div>
        </HeroContent>
      </HeroSection>

      {/* 콘텐츠 영역 */}
      <ContentContainer>
        <MainContent>
          {/* 메타데이터 카드 */}
          <MetadataCard>
            <h3>상세 정보</h3>
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="label">출시일</span>
                <span className="value">
                  {new Date(movie.release_date || movie.first_air_date || '').toLocaleDateString('ko-KR')}
                </span>
              </div>
              {movie.vote_average && (
                <div className="metadata-item">
                  <span className="label">평점</span>
                  <span className="value">★ {movie.vote_average.toFixed(1)}/10</span>
                </div>
              )}
              {director && (
                <div className="metadata-item">
                  <span className="label">감독</span>
                  <span className="value">{director.name}</span>
                </div>
              )}
            </div>
          </MetadataCard>

          {/* 출연진 카드 */}
          {mainCast.length > 0 && (
            <CastCard>
              <h3>주요 출연진</h3>
              <div className="cast-grid">
                {mainCast.map((actor) => (
                  <div key={actor.id} className="cast-item">
                    {actor.profile_path && (
                      <img 
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="cast-photo"
                      />
                    )}
                    <div className="cast-info">
                      <span className="cast-name">{actor.name}</span>
                      <span className="cast-character">{actor.character}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CastCard>
          )}
        </MainContent>

        <Sidebar>
          {/* 사이드바 공간 */}
        </Sidebar>
      </ContentContainer>

      {/* 관련 콘텐츠 추천 */}
      {recommendations.length > 0 && (
        <RecommendationsSection>
          <MovieCarousel 
            movies={recommendations.slice(0, 7)} 
            title="비슷한 콘텐츠" 
          />
        </RecommendationsSection>
      )}
      
      {/* 비디오 모달 */}
      <VideoModal 
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        movieId={Number(contentId)}
        movie={movie}
      />
    </StyledDetailPage>
  );
};

export default Detail;
