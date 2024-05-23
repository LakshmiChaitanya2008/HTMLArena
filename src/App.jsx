import React from "react";
import Arena from "./pages/Arena";
import Home from "./pages/Home";
import { Routes, Route, Outlet } from "react-router-dom";
import CreateArena from "./pages/CreateArena";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Arena />} />
    </Routes>
  );
}
