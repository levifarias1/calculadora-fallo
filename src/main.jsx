/* ==========================================
    🟦 IMPORTS DE LIBRERÍAS EXTERNAS
   ========================================== */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider,} from "react-router-dom";


/* ==========================================
    🟩 IMPORTS DE MIS COMPONENTES
   ========================================== */
// CORREGIDO: Se cambió 'calculadoraDolar' a 'CalculadoraDolar' para que
// coincida con el nombre real del archivo en la carpeta 'componentes'.

import CalculadoraDolar from "./componentes/calculadoraDolar";


/* ==========================================
    🟨 RENDER PRINCIPAL DE LA APLICACIÓN
   ========================================== */

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider
        router={createBrowserRouter([
          { path: "/", element: <CalculadoraDolar /> }, // Se corrigió 'c' a 'element'
        ])}
      />
    </StrictMode>
);
