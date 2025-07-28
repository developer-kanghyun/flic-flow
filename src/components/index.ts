// Only export components that have NO internal dependencies
// Layout components are imported directly in pages to avoid circular dependencies

// Basic UI components
export { default as WatchListButton } from "./watch-list-button/WatchListButton";
export { default as MovieCard } from "./movie-card/MovieCard";
export { default as Logo } from "./logo/Logo";
export { default as SearchBar } from "./search-bar/SearchBar";

export { default as Filter } from "./filter/Filter";
export { default as TagBar } from "./tag-bar/TagBar";
export { default as Accordion } from "./accordion/Accordion";

export { default as MoviePlayer } from "./movie-player/MoviePlayer";
export { default as MovieInfo } from "./movie-info/MovieInfo";
export { default as OttLink } from "./ott-link/OttLink";
export { default as MovieList } from "./movie-list/MovieList";
export { default as RankedMovieCard } from "./ranked-movie-card/RankedMovieCard";
export { default as TopFiveList } from "./top-five-list/TopFiveList";

export { VideoModal } from "./video-modal";

// Detail page components
export { default as MovieHero } from "./movie-hero/MovieHero";
export { default as MovieMetadata } from "./movie-metadata/MovieMetadata";
export { default as MovieCast } from "./movie-cast/MovieCast";

// NOTE: Header, Footer, Layouts and other container components are NOT exported here
// to avoid circular dependencies. Import them directly where needed:
// import Header from "@src/components/header/Header";
// import Footer from "@src/components/footer/Footer";
// import Layouts from "@src/components/layouts/Layouts";