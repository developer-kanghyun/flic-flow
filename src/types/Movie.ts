interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids?: number[];
  imdb_id?: string;
  rotten_tomatoes_rating?: string;
}

export default Movie;
