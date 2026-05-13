import React, { useState } from "react";

// Estilos em CSS puro para o visual Material Design 3
const styles = `
  .md3-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f8fafc;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    padding: 1rem;
    color: #0f172a;
    box-sizing: border-box;
  }
  .md3-card {
    width: 100%;
    max-width: 384px;
    background-color: #ffffff;
    padding: 2.5rem;
    border-radius: 28px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
    box-sizing: border-box;
  }
  .md3-title {
    font-size: 1.5rem;
    font-weight: 400;
    color: #0f172a;
    margin: 0;
  }
  .md3-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .md3-input-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .md3-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #334155;
    margin: 0 0 0 0.25rem;
  }
  .md3-input {
    padding: 0.75rem 1rem;
    background-color: transparent;
    border: 1px solid #cbd5e1;
    border-radius: 16px;
    outline: none;
    transition: all 0.2s ease;
    font-size: 1rem;
    box-sizing: border-box;
    width: 100%;
    font-family: inherit;
  }
  .md3-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 1px #2563eb;
  }
  .md3-error {
    margin-top: 1rem;
    padding: 0.75rem;
    background-color: #fef2f2;
    color: #dc2626;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 0;
  }
  .md3-success {
    margin-top: 1rem;
    padding: 0.75rem;
    background-color: #f0fdf4;
    color: #16a34a;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 12px;
    text-align: center;
    margin-bottom: 0;
  }
  .md3-btn-primary {
    width: 100%;
    background-color: #2563eb;
    color: white;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 9999px;
    border: none;
    transition: all 0.2s ease;
    cursor: pointer;
    font-family: inherit;
    margin-top: 0.5rem;
  }
  .md3-btn-primary:hover {
    background-color: #1d4ed8;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .md3-btn-text {
    width: 100%;
    background-color: transparent;
    color: #2563eb;
    font-weight: 500;
    font-size: 1rem;
    padding: 0.75rem;
    border-radius: 9999px;
    border: none;
    transition: background-color 0.2s ease;
    cursor: pointer;
    font-family: inherit;
  }
  .md3-btn-text:hover {
    background-color: #eff6ff;
  }
`;

export default function RegisterPage({onRegisterSucceed, onVoltar}) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    //estado inicial sempre vai começar como vendedor
    const [role, setRole] = useState("vendedor");
    const [mensagem, setMensagem] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCadastro = async (e) => {
        e.preventDefault(); //faz a pagina nao recarregar em cada requisição
        setMensagem("");
        setLoading(true);

        try {
          const resposta = await fetch('http://localhost:3001/auth/cadastro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email, password: senha, role: role})
          });

          const dados = await resposta.json();

          if(resposta.ok) {
            setMensagem("Usuário criado no banco");

            if(onRegisterSucceed) {
              onRegisterSucceed({novoEmail: email, cargo: role});
            }
          } else {
            setMensagem(dados.error || "Erro ao criar usuário");
          }
        } catch (error) {
          setMensagem("Erro de conexão.")
        }

        setLoading(false);
    };

    return (
    <>
      <style>{styles}</style>
      <div className="md3-container">
        <div className="md3-card">
          <h2 className="md3-title" style={{ textAlign: "center", marginBottom: "20px" }}>Criar Novo Usuário</h2>
          
          <form onSubmit={handleCadastro} className="md3-form">
            
            <div className="md3-input-group">
              <label className="md3-label">Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="md3-input"
              />
            </div>

            <div className="md3-input-group">
              <label className="md3-label">Senha:</label>
              <input 
                type="password" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                required 
                className="md3-input"
              />
            </div>

            <div className="md3-input-group">
              <label className="md3-label">Cargo (Role):</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="md3-input"
                style={{ cursor: "pointer" }}
              >
                <option value="vendedor">Vendedor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <button type="submit" className="md3-btn-primary">
              Criar Conta
            </button>

          </form>

          {/* fala se deu erro ou sucesso */}
          {mensagem && <p className={mensagem.includes("sucesso") || mensagem.includes("criado") ? "md3-success" : "md3-error"}>{mensagem}</p>}

          {/* botao feito para voltar para a tela de login */}
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <button onClick={onVoltar} className="md3-btn-text">
              Já tenho uma conta (Voltar)
            </button>
          </div>

        </div>
      </div>
    </>
  );
}