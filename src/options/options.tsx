import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";

const options = (
  <div>
    <h1>옵션화면</h1>
    <p className="text-5xl text-green-500">옵션화면</p>
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(options);
