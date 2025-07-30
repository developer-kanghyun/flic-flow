import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { 
  StyledDetailPage,
  ContentContainer,
  MainContent,
  Sidebar,
  CastCard,
  RecommendationsSection
} from "./styles";
import MovieHero from "@src/components/movie-hero/MovieHero";
import MovieMetadata from "@src/components/movie-metadata/MovieMetadata";
import MovieCast from "@src/components/movie-cast/MovieCast";
import MovieCarousel from "@src/components/movie-carousel/MovieCarousel";
import { useMovieDetail } from "@src/hooks/useMovieDetail";
import type { MediaType } from "@src/types/common";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const contentId = id;
  const mediaType = searchParams.get('type') as 'movie' | 'tv' | null;
  
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const {
    movie,
    credits,
    recommendations,
    hasTrailer,
    ratings,
    watchProviders,
    loadingState,
  } = useMovieDetail(id, mediaType);

  const handleActorClick = (actorName: string) => {
    navigate(`/searched?keyword=${encodeURIComponent(actorName)}&type=actor`);
  };

  const handlePlayTrailer = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsVideoModalOpen(false);
  };

  if (loadingState.isLoading) {
    return <div className="loading">영화 상세 정보 로딩 중...</div>;
  }

  if (loadingState.error) {
    return <div className="error" style={{ color: "red" }}>{loadingState.error}</div>;
  }

  if (!movie) {
    return <div className="error">영화 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <StyledDetailPage>
      <MovieHero
        movie={movie}
        hasTrailer={hasTrailer}
        isVideoModalOpen={isVideoModalOpen}
        onPlayTrailer={handlePlayTrailer}
        onCloseModal={handleCloseModal}
      />

      <ContentContainer>
        <MainContent>
          {/* 출연진 카드 */}
          {credits?.cast && credits.cast.length > 0 && (
            <CastCard>
              <h3>주요 출연진</h3>
              <div className="cast-grid">
                {credits.cast.slice(0, 8).map((actor) => (
                  <div 
                    key={actor.id} 
                    className="cast-item"
                    onClick={() => handleActorClick(actor.name)}
                  >
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
          {/* Sidebar content removed per user request */}
        </Sidebar>
      </ContentContainer>

      {recommendations.length > 0 && (
        <RecommendationsSection>
          <MovieCarousel
            movies={recommendations}
            title="추천 영화"
          />
        </RecommendationsSection>
      )}
    </StyledDetailPage>
  );
};

export default Detail;