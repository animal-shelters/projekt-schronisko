import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import AdminPanelView from "./routes/AdminPanelView";
import Header from "./components/Header";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="admin_panel" element={<AdminPanelView />} />
    </Routes>
  </BrowserRouter>
);
