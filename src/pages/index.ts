import { lazy } from "react";

export const Main = lazy(() => import("./main/Main"));
export const Detail = lazy(() => import("./detail/Detail"));
export const WatchList = lazy(() => import("./watch-list/WatchList"));
