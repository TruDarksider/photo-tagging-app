import React from "react";
import GameClock from "./GameClock";

const GameBar = (props) => {
  const { colors } = props;

  function isColorFound(bool, color) {
        return bool ? (
          <span
            //A is added in front because some Hex values would produce an invalid id
            id={"A" + color}
            style={{ background: "#" + color.id }}
            key={color}
          >
            {color}
          </span>
        ) : (
          <span id={"A" + color} key={color}>
            {color}
          </span>
        );
    }

    return (
        <div className="GameBar">
            <h2>Match the Colors</h2>
            {colors.map(color => {
                return (
                <div key={color.id}>
                    {isColorFound(color.found, color.id) }
                </div>
                );
                })}
        <GameClock colors={ colors } />
        </div>
    );
};

export default GameBar;