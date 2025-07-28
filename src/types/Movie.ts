interface Genre {
  id: number;
  name: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count?: number;
  popularity?: number;
  genre_ids?: number[];
  genres?: Genre[];
  runtime?: number;
  production_countries?: ProductionCountry[];
  imdb_id?: string;
  rotten_tomatoes_rating?: string;
  media_type?: 'movie' | 'tv';
  _truePopularityScore?: number;
}

export default Movie;
