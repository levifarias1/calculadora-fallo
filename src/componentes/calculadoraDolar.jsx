import { useState, useEffect } from "react";
import imagenMonito from '../assets/TikTok-Monkey-2340a4ca3baa45b9adc145d1e5db988b.jpg';
import '../CSS/stilo.css'

export default function CalculadoraDolar() {

  const [pesos, setPesos] = useState("");
  const [pesosRaw, setPesosRaw] = useState("");
  const [tasa, setTasa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tipoDolar, setTipoDolar] = useState("oficial");
  // 1. Nuevo estado para rastrear la dirección de la conversión. True por defecto (ARS -> USD)
  const [esConversionArsUsd, setEsConversionArsUsd] = useState(true); 

  const urls = {
    oficial: "https://dolarapi.com/v1/dolares/oficial",
    blue: "https://dolarapi.com/v1/dolares/blue",
    mep: "https://dolarapi.com/v1/dolares/bolsa",
    ccl: "https://dolarapi.com/v1/dolares/contadoconliqui",
    tarjeta: "https://dolarapi.com/v1/dolares/tarjeta",
  };

  // Formatear con separador de miles
  const formatearMiles = (valor) => {
    return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Formatear número completo (incluye decimales)
  const formatearNumero = (num) => {
    if (!num) return "---";
    const [entero, decimal] = num.toString().split(".");
    return decimal ? `${formatearMiles(entero)},${decimal}` : formatearMiles(entero);
  };

  const handleChangePesos = (e) => {
    let val = e.target.value.replace(/\./g, "");
    if (!/^\d*$/.test(val)) return;
    setPesosRaw(val);
    setPesos(formatearMiles(val));
  };

  // Se renombró la función para que sea más genérica
  const convertir = () => { 
    if (!pesosRaw || !tasa) return "---";
    // El cálculo sigue siendo el mismo: valor ingresado / tasa
    const resultado = (parseFloat(pesosRaw) / tasa).toFixed(2);
    return formatearNumero(resultado);
  };

  const revertirTasa = () => {
    if (!tasa || tasa === 0) return;
    const nueva = (1 / tasa).toFixed(6);
    setTasa(parseFloat(nueva));
    // 2. Cambiar la dirección de la conversión
    setEsConversionArsUsd(prev => !prev); 
  };

  useEffect(() => {
    const fetchTasa = async () => {
      setLoading(true);
      try {
        const res = await fetch(urls[tipoDolar]);
        const data = await res.json();
        if (data.venta) {
            setTasa(data.venta);
            // 3. Al cargar una nueva tasa, aseguramos que la dirección vuelva a ser ARS -> 
            //No me acordaba de esta genialidad JAJAJA
            setEsConversionArsUsd(true); 
        }
      } catch (error) {
        console.log("Error cargando tasa:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasa();
  }, [tipoDolar]);

  // Texto dinámico para el título
  const tituloConversor = esConversionArsUsd ? "Conversor ARS → USD" : "Conversor USD → ARS";

  // Texto dinámico para el resultado
  const etiquetaResultado = esConversionArsUsd ? "USD:" : "ARS:";


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-10" id="conversor-app">

      <div className="flex items-center gap-14" id="contenedor-central">

        <img
          src={imagenMonito}
          alt="TikTok Monkey"
          style={{ width: "220px", height: "220px", objectFit: "cover" }}
          className="rounded-2xl shadow-2xl border border-white/20"
          id="imagen-monito"
        />

        <div className="bg-white/70 backdrop-blur-lg p-8 max-w-md w-full rounded-2xl shadow-2xl" id="tarjeta-conversor">

          <h2 className="text-3xl font-semibold mb-6 text-gray-900 text-center">
            {/* 3. Usar el título dinámico */}
            {tituloConversor} 
          </h2>

          <label className="text-gray-200 font-semibold" htmlFor="tipoDolarSelect">Tipo de dólar: </label>
          <select
            value={tipoDolar}
            onChange={(e) => setTipoDolar(e.target.value)}
            className="w-full p-3 mt-1 mb-6 rounded-lg bg-white/60 border border-gray-300 focus:outline-none text-lg"
            id="tipoDolarSelect"
          >
            <option value="oficial">Oficial</option>
            <option value="blue">Blue</option>
            <option value="mep">MEP</option>
            <option value="ccl">CCL</option>
            <option value="tarjeta">Tarjeta</option>
          </select>

          <input
            type="text"
            placeholder={esConversionArsUsd ? "Ingrese pesos argentinos" : "Ingrese dólares estadounidenses"} 
            value={pesos}
            onChange={handleChangePesos}
            className="w-full p-3 rounded-lg mb-6 bg-white/60 border border-gray-300 focus:outline-none text-lg"
            id="inputPesos"
          />

          {loading ? (
            <p className="text-gray-700 text-center" id="mensajeCarga">Cargando tasa...</p>
          ) : (
            <>
              <p className="text-center text-3xl font-bold text-green-700" id="resultadoUSD">
                {etiquetaResultado} {convertir()}
              </p>

              <button
                onClick={revertirTasa}
                className="w-full mt-5 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg text-lg"
                id="botonRevertir"
              >
                Revertir tasa
              </button>

              <p className="text-center text-base mt-4 text-gray-800" id="tasaActual">
                Tasa actual ({tipoDolar}): {formatearNumero(tasa)}
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}