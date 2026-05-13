import { useState } from 'react';

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
  .md3-header {
    text-align: center;
    margin-bottom: 2rem;
  }
  .md3-title {
    font-size: 1.5rem;
    font-weight: 400;
    color: #0f172a;
    margin: 0 0 0.5rem 0;
  }
  .md3-subtitle {
    font-size: 0.875rem;
    color: #64748b;
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
    margin-top: 0.5rem;
    padding: 0.75rem;
    background-color: #fef2f2;
    color: #dc2626;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }
  .md3-error svg {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
  }
  .md3-actions {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
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
  }
  .md3-btn-primary:hover:not(:disabled) {
    background-color: #1d4ed8;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  .md3-btn-primary:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
    box-shadow: none;
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
  .md3-btn-text:active {
    background-color: #dbeafe;
  }
`;

// 1. Adicionamos o onIrParaCadastro aqui - VOLTOU A TER O EXPORT DEFAULT
export default function Login({ onLoginSucceed, onIrParaCadastro }) 
{
  // feito para criar variaveis 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(''); //vai guardar o texto do erro e só aparece na tela se estiver preenchido
  const [loading, setLoading] = useState(false);// se for true, desabilita o botao de enviar e mostra ao usuario o carregamento

  //funçao que roda quando clica no botao entrar
  const handleLogin = async (evento) => {
    evento.preventDefault();  //faz o navegador nao atualizar naturalmente

    setErro(''); //ao clicar no botão, limpa os erros antigos
    setLoading(true); //ao clicar no botao, trava ele e mostra ao usuário o carregamento

    try {
      const resposta = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // transforma as variáveis em um texto JSON que o back pede
        body: JSON.stringify({ email: email, password: password})
      });

      //ler a resposta do backend
      const dados = await resposta.json();

      if(resposta.ok) {
        //passar o token do banco para o shell
        if(onLoginSucceed) {
          onLoginSucceed({emailDigitado: email, token: dados.token, refresh: dados.refresh});
        }
      } else {
        //se a senha inserida for errada
        setErro(dados.error || "Acesso inválido.")
      }
    } catch (error) {
      //se nao conectar com o servidor ou se estiver desligado, vai dar esse trecho
      setErro("Erro de conexão");
      console.error(error);
    }
    //mesmo dando certo ou errado, acabou o carregamento
    setLoading(false);
  }

  //tela em si
  return (
    <>
      <style>{styles}</style>
      <div className="md3-container">
        <div className="md3-card">

          <div className="md3-header">
            <h1 className="md3-title">Fazer login</h1>
            <p className="md3-subtitle">Acesso à sua conta</p>
          </div>

          <form onSubmit={handleLogin} className="md3-form">

            <div className="md3-input-group">
              <p className="md3-label">Email:</p>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} required
                className="md3-input"
              />
            </div>

            <div className="md3-input-group">
              <p className="md3-label">Senha:</p>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)} required
                className="md3-input"
              />
            </div>

            {erro && (
              <p className="md3-error">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {erro}
              </p> /* se tiver algum texto dentro da variavel erro, APARECE e em vermelho*/
            )}

            <div className="md3-actions">
              <button type='submit' disabled={loading} className="md3-btn-primary">
                {loading ? "Autenticando..." : "Entrar"}
              </button>
            
              <button 
                type="button" 
                onClick={onIrParaCadastro} 
                className="md3-btn-text"
              >
                Ainda não tem conta? Criar agora
              </button>
            </div>
          
          </form>

        </div>
      </div>
    </>
  );
}