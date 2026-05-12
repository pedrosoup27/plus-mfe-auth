import React from "react";
import ReactDOM from "react-dom/client"; // motor que desenha na tela
import Login from "./pages/LoginPage";   

export default function App() {

  const computarSucesso = () => {
    alert("Tela de login foi ouvida, agora deve ser redirecionado");
  };

  return (
    <div>
      {/* Caso o login tenha sucesso, vai chamar o prop e depois vai executar computar sucesso, que deve trocar de tela*/}
      <Login onLoginSucceed={computarSucesso} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);