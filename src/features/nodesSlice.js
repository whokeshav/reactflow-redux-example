import { createSlice } from "@reduxjs/toolkit";

const nodesSlice = createSlice({
  name: "nodes",
  initialState: [{ id: "1", type: "default", data: `new node` }],
  reducers: {
    addNode: (state, action) => {
      state.push(action.payload);
    },
    deleteNode: (state, action) => {
      return state.filter((node) => node.id !== action.payload);
    },
  },
});

export const { addNode, deleteNode } = nodesSlice.actions;
export default nodesSlice.reducer;
