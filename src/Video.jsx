import React, { useRef, useEffect } from "react";
import { loadPlayer } from "rtsp-relay/browser";

const Video = ({ url='' }) => {
  const canvas = useRef(null);

  useEffect(() => {
    if (!canvas.current) throw new Error("Ref is null");

    loadPlayer({
      url: `ws://localhost:2000/api/stream/${url}`,
      canvas: canvas.current,
      disconnectThreshold: 10000,
    });
  }, []);

  return (
      <canvas style={{ width: 1000 }} ref={canvas} />
  );
};

export default Video;//React.memo 
