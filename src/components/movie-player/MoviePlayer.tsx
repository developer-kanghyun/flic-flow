import { useEffect, useState } from "react";
import { StyledMoviePlayer, StyledThumbnail } from "./styles";
import { getContentVideos } from "@src/api/tmdbApi";
import type { Video } from "@src/types/api";
import Movie from "@src/types/Movie";

interface MoviePlayerProps {
  movieId: number;
  movie: Movie; // movie 객체를 prop으로 받도록 추가
  autoPlay?: boolean; // 자동 재생 옵션 추가
}

const MoviePlayer = ({ movieId, movie, autoPlay = false }: MoviePlayerProps) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      setLoading(true);
      setError(null);
      try {
        const videos = await getContentVideos(movieId, movie.media_type);
        const trailer = videos.find(
          (video: Video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
          // autoPlay가 true면 바로 재생
          if (autoPlay) {
            setShowTrailer(true);
          }
        } else {
          setError("예고편을 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("Error fetching content videos:", err);
        setError("예고편을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();
  }, [movieId, movie.media_type, autoPlay]);


  if (loading) return <StyledMoviePlayer>예고편 로딩 중...</StyledMoviePlayer>;
  if (error) return <StyledMoviePlayer style={{ color: "red" }}>{error}</StyledMoviePlayer>;

  const thumbnailUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : ""; // 대체 이미지 또는 빈 값

  return (
    <StyledMoviePlayer>
      {trailerKey ? (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Movie Trailer"
        ></iframe>
      ) : (
        <StyledThumbnail src={thumbnailUrl}>
          <p>예고편을 찾을 수 없습니다.</p>
        </StyledThumbnail>
      )}
    </StyledMoviePlayer>
  );
};

export default MoviePlayer;
