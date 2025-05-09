import { Route, Routes } from "react-router-dom";
import { Main, Detail, WatchList } from "@pages/index";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/detail" element={<Detail />} />
      <Route path="/watch-list" element={<WatchList />} />
    </Routes>
  );
};

export default App;
