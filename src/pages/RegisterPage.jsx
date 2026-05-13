import React, { useState } from "react";

export default function RegisterPage({onRegisterSucceed, onVoltar}) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    //estado inicial sempre vai começar como vendedor
    const [role, setRole] = useState("vendedor");
    const [mensagem, setMensagem] = useState("");

    const handleCadastro = (e) => {
        e.preventDefault(); //faz a pagina nao recarregar em cada requisição

        //simulacao rapida de validacao
        if (email !== "" && senha !== ""){
            setMensagem("Usuário criado!");

            //avisar o shell que deu certo
            if(onRegisterSucceed){
                onRegisterSucceed({novoEmail: email, cargo: role});
            }
        } else {
            setMensagem("Preencha todos os campos por obiséquio");
        }
    };

    return (
    <div style={{ border: "1px solid #ccc", padding: "20px", maxWidth: "300px", margin: "20px auto" }}>
      <h2>Criar Novo Usuário</h2>
      
      <form onSubmit={handleCadastro} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Cargo (Role):</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "5px" }}
          >
            <option value="vendedor">Vendedor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit" style={{ padding: "10px", background: "green", color: "white", border: "none", cursor: "pointer" }}>
          Criar Conta
        </button>

      </form>

      {/* Mensagem de erro ou sucesso */}
      {mensagem && <p style={{ color: mensagem.includes("sucesso") ? "green" : "red" }}>{mensagem}</p>}

      {/* Botão para voltar para a tela de login */}
      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <button onClick={onVoltar} style={{ background: "transparent", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}>
          Já tenho uma conta (Voltar)
        </button>
      </div>

    </div>
  );
}
