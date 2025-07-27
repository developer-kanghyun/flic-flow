import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { StyledBody, StyledMovieBoxWrapper } from "./styles";
import { MovieInfo, MoviePlayer, WatchListButton, OttLinkContainer } from "@components/index";
import { StyledMoviePlayerContainer } from "@components/movie-player-container/styles";
import { StyledMovieInfoContainer } from "@components/movie-info-container/styles";
import { getContentDetail } from "@src/api/tmdbApi";
import Movie from "@src/types/Movie";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const contentId = id;
  const mediaType = searchParams.get('type') as 'movie' | 'tv' | null;
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContentDetail = async () => {
      if (!contentId) {
        setError("콘텐츠 ID가 없습니다.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const fetchedContent = await getContentDetail(Number(contentId), mediaType || undefined);
        setMovie(fetchedContent);
      } catch (err) {
        console.error("Error fetching content detail:", err);
        setError("콘텐츠 상세 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetail();
  }, [contentId, mediaType]);

  if (loading) return <p>영화 상세 정보 로딩 중...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!movie) return <p>영화 정보를 찾을 수 없습니다.</p>;

  return (
    <>
      <StyledBody>
        <StyledMovieBoxWrapper>
          <StyledMoviePlayerContainer>
            <MoviePlayer movieId={Number(contentId)} movie={movie} />
          </StyledMoviePlayerContainer>
          <StyledMovieInfoContainer>
            <MovieInfo movie={movie} />
            <WatchListButton movieId={movie.id} />
          </StyledMovieInfoContainer>
        </StyledMovieBoxWrapper>

        <OttLinkContainer movieId={Number(contentId)} movieTitle={movie.title || movie.name || "Unknown"} mediaType={movie.media_type} />
      </StyledBody>
    </>
  );
};

export default Detail;
