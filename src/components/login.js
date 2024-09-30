// src/components/login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para navegação
import agendaImage from '../assets/agenda.png'; // Caminho da imagem
import '../styles.css'; // Caminho do CSS

const Login = () => {
  const [username, setUsername] = useState(''); // Estado para username
  const [password, setPassword] = useState(''); // Estado para password
  const navigate = useNavigate(); // Hook para navegação

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de autenticação simples
    if (username === 'user' && password === '123') {
      navigate('/calendario'); // Redireciona para o calendário após login bem-sucedido
    } else {
      alert('Credenciais incorretas!'); // Exibe alerta se as credenciais forem incorretas
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src={agendaImage}
          alt="Agenda"
          className="login-logo"
        />
        <h2>My Schedule!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Atualiza o estado do username
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado do password
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
