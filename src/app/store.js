import { configureStore } from "@reduxjs/toolkit";
import nodesReducer from "../features/nodesSlice";
import edgesReducer from "../features/edgesSlice";

export default configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
});
