import React from "react";
import { Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
// import Success from "./SuccessPage";
import SuccessPage from "./SuccessPage";

const App = () => (
  <Routes>
    <Route path="/" element={<FormPage />} />
    <Route path="/valid" element={<SuccessPage />} />
  </Routes>
);

export default App;
