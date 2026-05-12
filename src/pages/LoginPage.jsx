import { useState } from 'react';

export default function Login({onLoginSucceed}) 
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

    //espera um segundo para fingir que realizou um acesso no servidor
    await new Promise(resolve => setTimeout(resolve,1000));

    //validacao falsa POR ENQUANTO
    if (email === "admin@teste.com" && password === "123456") {

      localStorage.setItem("tokenFake","meuTokenFake123456");

      if(onLoginSucceed) {
        onLoginSucceed();
      }

    } else {

      setErro("Email ou senha incorretos, verificar novamente.");

    }

    //mesmo dando certo ou errado, acabou o carregamento
    setLoading(false);
  }

  //tela em si
  return (
    <form onSubmit={handleLogin}>

    <p>Email:</p>
    <input
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />

    <p>Senha:</p>
    <input
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />

    <br /><br />

    {erro && (
      <p style={{color: 'red', fontWeight: 'bold'}}>{erro}</p> /* se tiver algum texto dentro da variavel erro, APARECE e em vermelho*/
    )}

    <button type='submit' disabled={loading}>
      {loading ? "Carregando..." : "Entrar"}
    </button>
    
    </form>
  );
}