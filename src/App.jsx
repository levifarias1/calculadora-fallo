import React from "react";
import { Routes, Route } from "react-router-dom";
import CalculadoraDolar from "./componentes/calculadoraDolar.jsx";
import "./CSS/styles.css";

function App() {
return (
    <Routes>
        <Route path="/" element={<CalculadoraDolar />} />
      {/* Otras rutas si las tenés */}
    </Routes>
    );
}

export default App;