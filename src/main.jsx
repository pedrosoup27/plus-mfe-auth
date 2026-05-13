import React, { useState } from "react";
import ReactDOM from "react-dom/client";

//aRQUIVO FEITO SO PARA TESTES LOCAIS
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage";

function Laboratorio() {
  const [telaAtual, setTelaAtual] = useState("login");

  return (
    <div>
      {telaAtual === "login" && (
        <LoginPage 
          // Testando se o MFE avisa que logou
          onLoginSucceed={(dados) => alert("Login avisou que deu certo!")} 
          
          // Função que vamos passar para o botão "Criar Conta" do Login
          onIrParaCadastro={() => setTelaAtual("cadastro")} 
        />
      )}

      {telaAtual === "cadastro" && (
        <RegisterPage 
          // Testando se a tela de cadastro avisa que deu certo
          onRegisterSucceed={(dados) => alert("Criou: " + dados.novoEmail + " como " + dados.cargo)}
          
          // Função do botão de voltar
          onVoltar={() => setTelaAtual("login")} 
        />
      )}
    </div>
  );
}

//NAO RETIRAR, MOTOR, ISOS QUE FAZ FUNCIONAR
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Laboratorio />
  </React.StrictMode>
);