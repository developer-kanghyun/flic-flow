import { lazy } from "react";

export const Main = lazy(() => import("./components/Header"));
export const Detail = lazy(() => import("./components/Layouts"));
export const WatchList = lazy(() => import("./watch-list/WatchList"));
