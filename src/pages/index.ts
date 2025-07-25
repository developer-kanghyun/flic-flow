import { lazy } from "react";

export const Main = lazy(() => import("./main/Main"));
export const Detail = lazy(() => import("./detail/Detail"));
export const WatchList = lazy(() => import("./watch-list/WatchList"));
export const Recommended = lazy(() => import("./recommended/Recommended"));
export const Searched = lazy(() => import("./searched/Searched"));

export const Test = lazy(() => import("./test/Test"));
