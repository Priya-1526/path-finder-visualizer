import React, { Component } from "react";

export default class Node extends Component {
  render() {
    const { col, row, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp } = this.props;

    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isWall
      ? "node-wall"
      : "";

    return (
      <>
        {/* Styles moved from Node.css */}
        <style>
          {`
            .node {
              width: 25px;
              height: 25px;
              outline: 1px solid rgb(175, 216, 248);
              display: inline-block;
            }

            .node-finish { background-color: red; }
            .node-start { background-color: green; }
            .node-wall { background-color: rgb(12, 53, 71); }

            .node-visited {
              animation-name: visitedAnimation;
              animation-duration: 1.5s;
              animation-timing-function: ease-in-out;
              animation-direction: alternate;
              animation-iteration-count: 1;
              animation-fill-mode: forwards;
              animation-play-state: running;
            }

            @keyframes visitedAnimation {
              0% {
                transform: scale(0.3);
                background-color: rgba(0, 0, 66, 0.75);
                border-radius: 100%;
              }
              50% {
                background-color: rgba(217, 17, 187, 0.75);
              }
              75% {
                transform: scale(1.2);
                background-color: rgba(122, 112, 226, 0.75);
              }
              100% {
                transform: scale(1);
                background-color: rgba(108, 245, 151, 0.75);
              }
            }

            .node-shortest-path {
              animation-name: shortestPath;
              animation-duration: 1.5s;
              animation-timing-function: ease-out;
              animation-direction: alternate;
              animation-iteration-count: 1;
              animation-fill-mode: forwards;
              animation-play-state: running;
            }

            @keyframes shortestPath {
              0% {
                transform: scale(0.6);
                background-color: rgb(255, 254, 106);
              }
              50% {
                transform: scale(1.2);
                background-color: rgb(255, 254, 106);
              }
              100% {
                transform: scale(1);
                background-color: rgb(255, 254, 106);
              }
            }
          `}
        </style>

        <td
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
        ></td>
      </>
    );
  }
}
