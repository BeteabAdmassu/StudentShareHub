import React, { useState, useEffect, useRef } from "react";
import { usePdf } from "react-pdf-js";

const MyPDFViewer = (props) => {
  const [page] = useState(1);
  const canvasEl = useRef(null);
  const [loading, numPages] = usePdf({
    file: props.pdf,
    page,
    canvasEl,
  });

  return (
    <canvas ref={canvasEl} style={{ maxWidth: "10rem", maxHeight: "11rem" }} />
  );
};

export default MyPDFViewer;
