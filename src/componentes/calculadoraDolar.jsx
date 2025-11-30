import { useState, useEffect } from "react";

export default function CalculadoraDolar() {
  /**
   * pesos → lo que el usuario escribe en el input
   * tasa → la tasa del dólar que trae la API (cuántos pesos cuesta 1 USD)
   * loading → indica si la API todavía se está cargando
   */
  const [pesos, setPesos] = useState("");
  const [tasa, setTasa] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * useEffect:
   * Este bloque se ejecuta UNA sola vez cuando el componente aparece en pantalla.
   * Sirve para hacer la llamada a la API y traer la tasa del dólar actualizada.
   */
  useEffect(() => {

    // Definimos una función async para poder usar "await".
    const fetchTasa = async () => {
      try {
        /**
         * Usamos una API estable que devuelve el dólar oficial en Argentina:
         *    https://dolarapi.com/v1/dolares/oficial
         * Esta API devuelve un JSON con "compra" y "venta".
         * En nuestro caso usamos "venta" (precio al que se compra el dólar).
         */
        const res = await fetch("https://dolarapi.com/v1/dolares/oficial");

        // Convertimos la respuesta a un objeto JSON.
        const data = await res.json();

        /**
         * Si la API respondió correctamente,
         * guardamos la tasa del dólar:
         *    data.venta = pesos por 1 USD
         */
        if (data.venta) {
          setTasa(data.venta);
        }
      } catch (error) {
        /**
         * Si ocurre un error (sin internet, API caída, etc.)
         * lo mostramos en la consola para depurar.
         */
        console.log("Error cargando tasa:", error);
      } finally {
        /**
         * No importa si salió bien o mal,
         * dejamos de mostrar "Cargando..."
         */
        setLoading(false);
      }
    };

    // Ejecutamos la función que definimos arriba.
    fetchTasa();

  }, []); // ← El array vacío significa que solo se ejecuta una vez.


  /**
   * Función para convertir los pesos a dólares.
   * Si todavía no hay tasa o el usuario no escribió un número,
   * siempre devolvemos 0.00 para evitar errores.
   *
   * IMPORTANTE:
   *   Antes usábamos "pesos * tasa" porque la API daba ARS → USD.
   *   Ahora la API da PESOS POR 1 USD, entonces:
   *
   *        dólares = pesos / tasa
   */
  const convertir = () => {
    if (!pesos || isNaN(pesos) || tasa === null) return "0.00";

    return (pesos / tasa).toFixed(2); // Redondeamos a 2 decimales.
  };


  return (
  <div className="p-6 max-w-sm mx-auto bg-white shadow-lg rounded-xl">

      {/* Título de la app */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
        Conversor ARS → USD (con API)
      </h2>

      {/* Input donde el usuario escribe los pesos */}
      <input
        type="number"
        placeholder="Ingrese pesos argentinos"
        value={pesos}
        onChange={(e) => setPesos(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      {/* Si la API todavía se está cargando, mostramos un mensaje... */}
      {loading ? (
        <p className="text-gray-600 text-center">Cargando tasa actual...</p>
      ) : (
        /**
         * ...y si ya cargó, mostramos el resultado.
         */
        <p className="text-center text-lg font-semibold">
          USD: {convertir()}
        </p>
      )}

    <div>
      <h2>Hola</h2>
    </div>

  </div>
    
  );
}
