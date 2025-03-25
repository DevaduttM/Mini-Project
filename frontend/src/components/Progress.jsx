import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Progress = ({ percentage }) => {
  return (
    <>
      <div className="w-[20%] h-auto">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: "#0088FE",
            textColor: "#333",
            trailColor: "#E0E0E0",
          })}
        />
      </div>
    </>
  );
};

export default Progress;
