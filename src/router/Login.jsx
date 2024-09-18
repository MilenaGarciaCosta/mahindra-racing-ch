import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, senha });
      localStorage.setItem('token', response.data.token);  // Salva o token no localStorage
      navigate('/egame');  // Redireciona para o E-game após o login
    } catch (err) {
      alert('Erro no login');
    }
  };

  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button type="submit">Entrar</button>
      </form>
      <p>Ainda não tem uma conta? <span onClick={() => navigate('/cadastro')}>Cadastre-se aqui</span></p>
    </section>
  );
};

export default Login;

