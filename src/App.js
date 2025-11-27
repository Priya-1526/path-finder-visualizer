import React from "react";
import PathfindingVisualizer from "./components/PathfindingVisualizer";

function App() {
  // Inline styles
  const appStyle = {
    textAlign: "center",
    transform: "scale(0.9)",
    transformOrigin: "top center",
    width: "100%",
  };

  const buttonStyle = {
    padding: "8px 14px",
    margin: "4px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    transition: "0.2s ease",
  };

  return (
    <div style={appStyle}>
      {/* Styles for hover effects and animations */}
      <style>
        {`
          /* Hover effects for buttons */
          .btn-clear-grid { background-color: #ff4d4d; color: white; }
          .btn-clear-grid:hover { background-color: #e60000; }

          .btn-clear-walls { background-color: #ff9933; color: white; }
          .btn-clear-walls:hover { background-color: #e67300; }

          .btn-dijkstra { background-color: #4d79ff; color: white; }
          .btn-dijkstra:hover { background-color: #335ce6; }

          .btn-astar { background-color: #aa00ff; color: white; }
          .btn-astar:hover { background-color: #7a00b3; }

          .btn-bfs { background-color: #00cc66; color: white; }
          .btn-bfs:hover { background-color: #00994d; }

          .btn-dfs { background-color: #0099cc; color: white; }
          .btn-dfs:hover { background-color: #0077a3; }

          .btn-mobile { background-color: #666666; color: white; }
          .btn-mobile:hover { background-color: #4d4d4d; }
        `}
      </style>

      <PathfindingVisualizer buttonStyle={buttonStyle} />
    </div>
  );
}

export default App;
