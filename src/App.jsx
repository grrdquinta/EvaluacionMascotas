import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
//import Home from "./pages/Home";
//import NotFound from "./pages/PageNotFound";
//import Users from "./pages/Users";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Dashboard />} />
        </Routes>
      </Router>

      <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-gray-800 text-white",
            style: {
              fontSize: "16px",
              padding: "10px 20px",
            },
          }}
        />
    </>
  );
}

export default App;
