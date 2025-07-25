import { create } from 'zustand';

interface Genre {
  id: number;
  name: string;
}

interface FilterState {
  selectedOtts: number[];
  selectedGenres: number[];
  selectedKeywords: number[];
  activeTag: string | null;
  movieGenres: Genre[];
  tvGenres: Genre[];
  setOtts: (otts: number[]) => void;
  setGenres: (genres: number[]) => void;
  setKeywords: (keywords: number[]) => void;
  setActiveTag: (tag: string | null) => void;
  setMovieGenres: (genres: Genre[]) => void;
  setTvGenres: (genres: Genre[]) => void;
}

const getInitialState = () => {
  const storedOtts = localStorage.getItem('selectedOtts');
  const storedGenres = localStorage.getItem('selectedGenres');
  const storedKeywords = localStorage.getItem('selectedKeywords');
  const storedActiveTag = localStorage.getItem('activeTag');
  return {
    selectedOtts: storedOtts ? JSON.parse(storedOtts) : [],
    selectedGenres: storedGenres ? JSON.parse(storedGenres) : [],
    selectedKeywords: storedKeywords ? JSON.parse(storedKeywords) : [],
    activeTag: storedActiveTag || 'all',
    movieGenres: [],
    tvGenres: [],
  };
};

export const useFilterStore = create<FilterState>((set) => ({
  ...getInitialState(),
  setOtts: (otts) => {
    set({ selectedOtts: otts });
    localStorage.setItem('selectedOtts', JSON.stringify(otts));
  },
  setGenres: (genres) => {
    set({ selectedGenres: genres });
    localStorage.setItem('selectedGenres', JSON.stringify(genres));
  },
  setKeywords: (keywords) => {
    set({ selectedKeywords: keywords });
    localStorage.setItem('selectedKeywords', JSON.stringify(keywords));
  },
  setActiveTag: (tag) => {
    set({ activeTag: tag });
    if (tag) {
      localStorage.setItem('activeTag', tag);
    } else {
      localStorage.removeItem('activeTag');
    }
  },
  setMovieGenres: (genres) => set({ movieGenres: genres }),
  setTvGenres: (genres) => set({ tvGenres: genres }),
}));
