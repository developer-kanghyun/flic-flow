import { create } from 'zustand';

interface FilterState {
  selectedOtts: number[];
  selectedGenres: number[];
  selectedKeywords: number[]; // New: selectedKeywords state
  activeTag: string | null;
  setOtts: (otts: number[]) => void;
  setGenres: (genres: number[]) => void;
  setKeywords: (keywords: number[]) => void; // New: setKeywords action
  setActiveTag: (tag: string | null) => void;
}

const getInitialState = () => {
  const storedOtts = localStorage.getItem('selectedOtts');
  const storedGenres = localStorage.getItem('selectedGenres');
  const storedKeywords = localStorage.getItem('selectedKeywords'); // New: storedKeywords
  const storedActiveTag = localStorage.getItem('activeTag');
  return {
    selectedOtts: storedOtts ? JSON.parse(storedOtts) : [],
    selectedGenres: storedGenres ? JSON.parse(storedGenres) : [],
    selectedKeywords: storedKeywords ? JSON.parse(storedKeywords) : [], // New: load storedKeywords
    activeTag: storedActiveTag || 'all',
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
  setKeywords: (keywords) => { // New: setKeywords action implementation
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
}));
