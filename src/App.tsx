import { Route, Routes } from "react-router-dom";
import {
  Main,
  Detail,
  WatchList,
  Recommended,
  Searched,
} from "@pages/index";
import Layouts from "@src/components/layouts/Layouts";
import { useEffect } from "react";
import { getMovieGenres, getTvGenres } from "./api/tmdbApi";
import { useFilterStore } from "./store/filterStore";

const App = () => {
  const { setMovieGenres, setTvGenres } = useFilterStore();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const movieGenres = await getMovieGenres();
        const tvGenres = await getTvGenres();
        setMovieGenres(movieGenres);
        setTvGenres(tvGenres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, [setMovieGenres, setTvGenres]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layouts>
            <Main />
          </Layouts>
        }
      />
      <Route
        path="/detail/:id"
        element={
          <Layouts>
            <Detail />
          </Layouts>
        }
      />
      <Route
        path="/watch-list"
        element={
          <Layouts>
            <WatchList />
          </Layouts>
        }
      />
      <Route
        path="/recommended/:genre"
        element={
          <Layouts>
            <Recommended />
          </Layouts>
        }
      />
      <Route
        path="/searched"
        element={
          <Layouts>
            <Searched />
          </Layouts>
        }
      />
    </Routes>
  );
};

export default App;
