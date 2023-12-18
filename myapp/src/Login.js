import React, { useState } from "react";




const Login = () => {
    const[email, setEmail] = useState ('')
    const[senha, setSenha] = useState ('')

    const handleLoginSubmit = (event) => {
        event.preventDefault ()
        console.log("Enviou", {email: email, senha: senha,})
    }

  return (
    <div>
      <form onSubmit= {handleLoginSubmit}>
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <h4>Email</h4>
          <input
            type="email"
            placeholder="Insira seu email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4>Senha</h4>
          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit"> Entrar </button>
      </form>
    </div>
  );
};
export default Login;
