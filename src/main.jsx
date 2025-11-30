/* ==========================================
    🟦 IMPORTS DE LIBRERÍAS EXTERNAS
   ========================================== */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/* ==========================================
    🟩 IMPORTS DE MIS COMPONENTES
   ========================================== */
import CalculadoraDolar from "./componentes/calculadoraDolar";


/* ==========================================
    🟨 RENDER PRINCIPAL DE LA APLICACIÓN
   ========================================== */
createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", c: <CalculadoraDolar /> },
        ])}
      />
    </StrictMode>
);