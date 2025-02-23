import React, { useRef, useState, useEffect } from "react";
import { FaUndo, FaRedo, FaTrash, FaPencilAlt, FaSave, FaPalette } from "react-icons/fa";
import tileset from "../assets/space1/tileset.png"; 

const CollaborativeBoard = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [brushSize, setBrushSize] = useState(4);
  const [brushColor, setBrushColor] = useState("#000000");
  const [canvasImage, setCanvasImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.85; 
    canvas.height = window.innerHeight * 0.7; 
    canvas.style.cursor = "crosshair";

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = brushColor; 
    context.lineWidth = brushSize;
    contextRef.current = context;

    if (canvasImage) {
      const img = new Image();
      img.src = canvasImage;
      img.onload = () => context.drawImage(img, 0, 0);
    }
  }, [brushSize, brushColor, canvasImage]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    saveState();
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();
    setHistory((prev) => [...prev, imageData]);
    setRedoStack([]); // Reset redo stack when saving new state
    setCanvasImage(imageData);
  };

  const restoreCanvas = (imageData) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const image = new Image();
    image.src = imageData;
    image.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    };
    setCanvasImage(imageData);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prevState = history[history.length - 1]; // Get the last state in history
    const newHistory = history.slice(0, history.length - 1); // Create a new array excluding the last state
    setHistory(newHistory);
    setRedoStack((prev) => [...prev, canvasRef.current.toDataURL()]); // Save the current canvas state to redo stack
    restoreCanvas(prevState); // Restore the previous state
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextState = redoStack[redoStack.length - 1]; // Get the last state in redo stack
    const newRedoStack = redoStack.slice(0, redoStack.length - 1); // Create a new array excluding the last state
    setRedoStack(newRedoStack);
    setHistory((prev) => [...prev, canvasRef.current.toDataURL()]); // Save the current canvas state to history
    restoreCanvas(nextState); // Restore the next state
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHistory([]); // Reset history
    setRedoStack([]); // Reset redo stack
    setCanvasImage(null); // Clear the canvas image
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start p-8"
      style={{
        background: `linear-gradient(rgba(196, 214, 229, 0.7), rgba(173, 216, 230, 0.7)), url(${tileset})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1
        className="text-4xl font-extrabold mb-4 tracking-wide"
        style={{
          fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
          color: "#007BAC",
        }}
      >
        The Idea Canvas
      </h1>

      <div className="flex items-center space-x-6 bg-gradient-to-r from-blue-300 to-blue-300 p-4 rounded-2xl shadow-xl mb-6 backdrop-blur-lg">
        <button
          onClick={handleUndo}
          className="flex items-center gap-2 p-2 text-white hover:bg-blue-400 rounded-lg transition-transform transform hover:scale-110"
        >
          <FaUndo /> Undo
        </button>
        <button
          onClick={handleRedo}
          className="flex items-center gap-2 p-2 text-white hover:bg-blue-400 rounded-lg transition-transform transform hover:scale-110"
        >
          <FaRedo /> Redo
        </button>
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 p-2 text-white hover:bg-red-400 rounded-lg transition-transform transform hover:scale-110"
        >
          <FaTrash /> Clear
        </button>
        <button
          onClick={saveDrawing}
          className="flex items-center gap-2 p-2 text-white hover:bg-green-400 rounded-lg transition-transform transform hover:scale-110"
        >
          <FaSave /> Save
        </button>

        <label className="flex items-center gap-2 text-white">
          <FaPencilAlt /> Brush:
          <input
            type="range"
            min="2"
            max="20"
            value={brushSize}
            onChange={(e) => setBrushSize(e.target.value)}
            className="cursor-pointer"
          />
        </label>

        <label className="flex items-center gap-2 text-white">
          <FaPalette /> Color:
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            className="cursor-pointer bg-transparent"
          />
        </label>
      </div>

      <div className="rounded-lg overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          className="bg-white rounded-lg"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
        />
      </div>
    </div>
  );
};

export default CollaborativeBoard;
