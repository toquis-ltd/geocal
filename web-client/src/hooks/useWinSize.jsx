import { useState, useEffect } from "react";

export default function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: document.innerWidth,
    height: document.innerHeight,
  });
  useEffect(() => {
      function handleResize() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
          });
      }
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    });
  return windowSize;
}