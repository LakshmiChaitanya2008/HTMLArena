import React from "react";
import Arena from "./pages/Arena";
import Home from "./pages/Home";
import { Routes, Route, Outlet } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/arena/:id" element={<Arena />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}
