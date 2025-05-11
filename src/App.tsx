import { Route, Routes } from "react-router-dom";
import { Main, Detail, WatchList } from "@pages/index";
import Layouts from "./components/Layouts";

const App = () => {
  return (
    <Layouts>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/watch-list" element={<WatchList />} />
      </Routes>
    </Layouts>
  );
};

export default App;
