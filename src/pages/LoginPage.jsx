import { useState } from 'react';

// 1. Adicionamos o onIrParaCadastro aqui
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
    <div>
      <form onSubmit={handleLogin}>

        <p>Email:</p>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)} required
        />

        <p>Senha:</p>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} required
        />

        <br /><br />

        {erro && (
          <p style={{color: 'red', fontWeight: 'bold'}}>{erro}</p> /* se tiver algum texto dentro da variavel erro, APARECE e em vermelho*/
        )}

        <button type='submit' disabled={loading}>
          {loading ? "Autenticando..." : "Entrar"}
        </button>
      
      </form>

      
      <div style={{ marginTop: "20px" }}>
        <button 
          type="button" 
          onClick={onIrParaCadastro} 
          style={{ background: "transparent", border: "none", color: "blue", cursor: "pointer", textDecoration: "underline" }}
        >
          Ainda não tem conta? Criar agora
        </button>
      </div>

    </div>
  );
}