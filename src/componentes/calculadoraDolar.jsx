import { useState, useEffect } from "react";
import imagenMonito from '../assets/TikTok-Monkey-2340a4ca3baa45b9adc145d1e5db988b.jpg'

export default function CalculadoraDolar() {

  const [pesos, setPesos] = useState("");
  const [tasa, setTasa] = useState(null);
  const [loading, setLoading] = useState(true);

  const convertir = () => {
    if (!pesos || !tasa) return "---";
    return (parseFloat(pesos) / tasa).toFixed(2);
  };

  const revertirTasa = () => {
    if (!tasa || tasa === 0) return;
    setTasa((1 / tasa).toFixed(6));
  };

  useEffect(() => {
    const fetchTasa = async () => {
      try {
        const res = await fetch("https://dolarapi.com/v1/dolares/oficial");
        const data = await res.json();
        if (data.venta) setTasa(data.venta);
      } catch (error) {
        console.log("Error cargando tasa:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasa();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">

      {/* Contenedor en fila */}
      <div className="flex items-center gap-8">

        {/* Imagen */}
        <img
  src={imagenMonito}
  alt="TikTok Monkey"
  style={{
    width: "180px",
    height: "180px",
    objectFit: "cover"
  }}
  className="rounded-xl shadow-xl border border-white/20"
/>


        {/* Calculadora */}
        <div className="bg-white/70 backdrop-blur-lg p-6 max-w-sm w-full rounded-xl shadow-2xl">

          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Conversor ARS → USD
          </h2>

          <input
            type="number"
            placeholder="Ingrese pesos argentinos"
            value={pesos}
            onChange={(e) => setPesos(e.target.value)}
            className="w-full p-3 rounded-lg mb-4 bg-white/50 border border-gray-300 focus:outline-none"
          />

          {loading ? (
            <p className="text-gray-700 text-center">Cargando tasa actual...</p>
          ) : (
            <>
              <p className="text-center text-2xl font-bold text-green-700">
                USD: {convertir()}
              </p>

              {/* Botón para revertir la tasa */}
              <button
                onClick={revertirTasa}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                Revertir tasa
              </button>

              {/* Mostrar la tasa actual */}
              <p className="text-center text-sm mt-2 text-gray-700">
                Tasa actual: {tasa}
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
