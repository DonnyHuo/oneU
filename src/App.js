import Header from "./components/header";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lottery from "./pages/Lottery";
import Referral from "./pages/Referral";
import Tutorials from "./pages/Tutorials";
import Discord from "./pages/Discord";
import Terms from './pages/Terms'
import Policy from './pages/Policy'

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
            <Route path="/terms" element={<Terms />}></Route>
            <Route path="/policy" element={<Policy />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
