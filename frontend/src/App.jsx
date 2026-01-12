import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from "./chatbot/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
       

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Chatbot />} />
          </Routes>
       
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
