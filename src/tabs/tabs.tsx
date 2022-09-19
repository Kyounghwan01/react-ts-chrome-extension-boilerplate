import React from "react";
import { Routes, Route } from "react-router-dom";
import "../assets/tailwind.css";
import Home from "./components/Home";
import About from "./components/About";

const Tabs = () => {
  return (
    <div>
      <ul>
        <li>
          <a href="#/">home</a>
        </li>
        <li>
          <a href="#/about">about</a>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default Tabs;
