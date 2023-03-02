import React, { useState, useEffect } from "react";

const ImageGrid = ({ imageSrc, width, height }) => {
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);

      const imageData = context.getImageData(0, 0, width, height);
      const data = imageData.data;

      const grid = [];
      const squareWidth = width / 3;
      const squareHeight = height / 3;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const pixels = context.getImageData(
            j * squareWidth,
            i * squareHeight,
            squareWidth,
            squareHeight
          ).data;
          const index = i * 3 + j;
          grid[index] = {
            imageData: new ImageData(pixels, squareWidth, squareHeight),
            x: j * squareWidth,
            y: i * squareHeight,
          };
        }
      }
      setGrid(grid);
    };
  }, [imageSrc]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (revealed < 9) {
        setRevealed((prev) => prev + 1);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [revealed]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: width }}>
      {grid.map((square, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            width: width / 3,
            height: height / 3,
          }}
        >
          {revealed > index ? (
            <img src={imageSrc} alt="grid-square" />
          ) : (
            <canvas
              style={{ position: "absolute", left: square.x, top: square.y }}
              width={square.imageData.width}
              height={square.imageData.height}
              ref={(canvas) => {
                if (canvas) {
                  const ctx = canvas.getContext("2d");
                  ctx.putImageData(square.imageData, 0, 0);
                }
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
