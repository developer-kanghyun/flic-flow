const OMDB_API_KEY = import.meta.env?.VITE_OMDB_API_KEY || 
                    (typeof process !== 'undefined' ? process.env?.REACT_APP_OMDB_API_KEY : null) || 
                    'your_omdb_api_key';
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

interface OMDBResponse {
  imdbRating: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Response: string;
}

export const fetchOMDBRatings = async (imdbId: string) => {
  try {
    const response = await fetch(
      `${OMDB_BASE_URL}?i=${imdbId}&apikey=${OMDB_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('OMDB API request failed');
    }
    
    const data: OMDBResponse = await response.json();
    
    if (data.Response === 'False') {
      return null;
    }
    
    const rottenTomatoesRating = data.Ratings?.find(
      rating => rating.Source === 'Rotten Tomatoes'
    )?.Value;
    
    return {
      imdbRating: data.imdbRating,
      rottenTomatoesRating: rottenTomatoesRating || null
    };
  } catch (error) {
    console.error('Error fetching OMDB ratings:', error);
    return null;
  }
};

// TMDB 영화 ID를 사용해서 IMDB ID를 가져오는 함수
export const fetchIMDBId = async (tmdbId: number) => {
  try {
    const TMDB_API_KEY = import.meta.env?.VITE_TMDB_API_KEY || 
                        (typeof process !== 'undefined' ? process.env?.REACT_APP_TMDB_API_KEY : null);
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${tmdbId}/external_ids?api_key=${TMDB_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('TMDB external IDs request failed');
    }
    
    const data = await response.json();
    return data.imdb_id;
  } catch (error) {
    console.error('Error fetching IMDB ID:', error);
    return null;
  }
};