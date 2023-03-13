import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./utils/ScrollToTop";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);
root.render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>
);
