import React from "react";
import {
  ClipLoader,
  BarLoader,
  CircleLoader,
  GridLoader,
  HashLoader,
  PuffLoader,
  RingLoader,
  ScaleLoader,
  SyncLoader,
} from "react-spinners";

export const Spinner = ({
  type = "ClipLoader",
  size = 48,
  color = "white",
  className = "",
}) => {
  const spinnerProps = {
    size,
    color,
    className,
  };

  const renderSpinner = () => {
    switch (type) {
      case "ClipLoader":
        return <ClipLoader {...spinnerProps} />;
      case "BarLoader":
        return <BarLoader {...spinnerProps} />;
      case "CircleLoader":
        return <CircleLoader {...spinnerProps} />;
      case "GridLoader":
        return <GridLoader {...spinnerProps} />;
      case "HashLoader":
        return <HashLoader {...spinnerProps} />;
      case "PuffLoader":
        return <PuffLoader {...spinnerProps} />;
      case "RingLoader":
        return <RingLoader {...spinnerProps} />;
      case "ScaleLoader":
        return <ScaleLoader {...spinnerProps} />;
      case "SyncLoader":
        return <SyncLoader {...spinnerProps} />;
      default:
        return <ClipLoader {...spinnerProps} />;
    }
  };

  return <div className={className}>{renderSpinner()}</div>;
};
