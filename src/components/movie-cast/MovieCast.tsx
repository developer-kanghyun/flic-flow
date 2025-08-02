import { memo } from "react";
import type { Credits } from "@src/types/api";
import { CastCard } from "./styles";

interface MovieCastProps {
  credits: Credits;
}

const MovieCast = memo(({ credits }: MovieCastProps) => {
  const director = credits.crew.find(
    (person) => person.job === "Director" || person.job === "감독"
  );

  const mainCast = credits.cast.slice(0, 8);

  return (
    <CastCard>
      <h3>출연진 및 제작진</h3>
      
      {director && (
        <div className="cast-section">
          <h4>감독</h4>
          <div className="cast-member">
            {director.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w185${director.profile_path}`}
                alt={director.name}
                className="cast-photo"
              />
            )}
            <div className="cast-info">
              <div className="cast-name">{director.name}</div>
              <div className="cast-role">감독</div>
            </div>
          </div>
        </div>
      )}

      {mainCast.length > 0 && (
        <div className="cast-section">
          <h4>주요 출연진</h4>
          <div className="cast-grid">
            {mainCast.map((actor) => (
              <div key={actor.id} className="cast-member">
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className="cast-photo"
                  />
                )}
                <div className="cast-info">
                  <div className="cast-name">{actor.name}</div>
                  <div className="cast-role">{actor.character}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </CastCard>
  );
});

MovieCast.displayName = 'MovieCast';

export default MovieCast;