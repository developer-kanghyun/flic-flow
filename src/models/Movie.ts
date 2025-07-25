export interface MovieWithGenre {
  type: string;
  movies: Movie[];
}

export interface Movie {
  id: number;
  title: string;
  thumbnail: string;
}
