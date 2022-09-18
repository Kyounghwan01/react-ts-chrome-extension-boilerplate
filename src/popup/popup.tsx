import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";

const test = (
  <div>
    <h1>헬로헬로 테일윈드</h1>
    <p className="text-5xl text-green-500">우헤헤헤헤ㅔㅎ에에에ㅔ에</p>
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(test);
