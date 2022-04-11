import React from "react";
import { createRoot } from "react-dom/client";
import Carousel from "./components/Carousel";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const container = (document.getElementById("root")) as HTMLInputElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Carousel />
  </React.StrictMode>
);

reportWebVitals();
