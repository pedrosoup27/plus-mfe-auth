import React, { useState } from "react";
import ReactDOM from "react-dom/client";

// Importando suas peças de Lego
// Se eles estiverem dentro de uma pasta, mude para "./pasta/LoginPage"
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage";

// 1. O SEU LABORATÓRIO (A TV para testar)
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

// 2. A TOMADA NA PAREDE (Obrigatório no main.jsx)
// Isso é o que realmente desenha o laboratório na tela do navegador
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Laboratorio />
  </React.StrictMode>
);