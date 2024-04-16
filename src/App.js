import Header from "./components/header";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lottery from "./pages/Lottery";
import Referral from "./pages/Referral";
import Tutorials from "./pages/Tutorials";
import Discord from "./pages/Discord";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Lottery />}></Route>
            <Route path="/referral" element={<Referral />}></Route>
            <Route path="/tutorials" element={<Tutorials />}></Route>
            <Route path="/discord" element={<Discord />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
