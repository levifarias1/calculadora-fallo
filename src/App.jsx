import { Link } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Mi Proyecto React</h1>

      <Link
        to="/calculadora"
        style={{ 
          padding: "10px 20px", 
          display: "inline-block", 
          marginTop: "20px",
          background: "#007bff",
          color: "white",
          borderRadius: "8px",
          textDecoration: "none"
        }}
      >
        Ir a la Calculadora de Dólar
      </Link>
    </div>
  );
}
