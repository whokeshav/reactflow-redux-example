import React, { useState, useCallback } from "react";
import ReactFlow, { Controls, addEdge, MiniMap } from "reactflow";
import { FaTimesCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addNode, deleteNode } from "../features/nodesSlice";
import "reactflow/dist/style.css";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialElements = [
  {
    id: "1",
    type: "input",
    data: "node 1",
    position: { x: 0, y: 0 },
  },
];

const Home = () => {
  const dispatch = useDispatch();

  const initialEdges = [];
  const [elements, setElements] = useState(initialElements);
  const [idCount, setIdCount] = useState(2);
  const [edges, setEdges] = useState(initialEdges); // Start with 2 as initialElements already has one node

  const [selectedNode, setSelectedNode] = useState(null);
  const handleNodeAdd = () => {
    const newNode = {
      id: `${idCount}`,
      data: `Node ${idCount}`,
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight - 100,
      },
    };
    setElements((prevElements) => [...prevElements, newNode]);
    setIdCount(idCount + 1);
  };

  const handleElementClick = (element) => {
    setSelectedNode(element);
  };
  const handleElementDelete = (idToDelete) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== idToDelete)
    );
  };
  const handleSaveTitle = (title) => {
    if (selectedNode) {
      const updatedNode = {
        ...selectedNode,
        data: { ...selectedNode.data, label: title },
      };
      dispatch(deleteNode(selectedNode.id));
      dispatch(addNode(updatedNode));
      setSelectedNode(null);
    }
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  return (
    <div
      style={{
        display: "flex",
        alignItems: "space-between",
        height: "100vh",
        width: "100%",
      }}
    >
      <button onClick={handleNodeAdd}>Create Node</button>
      <div style={{ flex: 1, backgroundColor: "#e5e5e5" }}>
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onElementsClick={handleElementClick}
          deleteKeyCode={46}
          fitView
          style={rfStyle} /* delete key code */
        >
          {elements.map((element) => (
            <div
              onClick={handleElementClick}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#e5e5e5",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  margin: "25px",
                  padding: "25px",
                }}
              >
                <div style={{ position: "relative" }}>
                  {element.data}
                  <div
                    style={{
                      cursor: "Pointer",
                      position: "absolute",
                      top: "-25px",
                      right: "-15px",
                    }}
                    onClick={() => handleElementDelete(element.id)}
                  >
                    X
                  </div>
                </div>
              </div>
            </div>
          ))}
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <div
        style={{ width: "200px", backgroundColor: "#f0f0f0", padding: "10px" }}
      >
        {selectedNode && (
          <div style={{ flex: 1, backgroundColor: "#e5e5e5" }}>
            <input
              type="text"
              placeholder="Enter title"
              onChange={(e) => handleSaveTitle(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
