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

      // Armazene o usuarioId no localStorage
      localStorage.setItem('usuarioId', response.data.usuarioId);

      navigate('/egame');  // Redireciona para o E-game após o login
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Erro no login');
    }
  };

  return (
    <section className="main loginContainer">

      <form className='form-login' onSubmit={handleSubmit}>
        <div className="titulo-container">
          <h2>login</h2>
        </div>

        <div className="input-group">
          <input required type="text" name="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="user-label">Email</label>
        </div>

        <div className="input-group">
          <input required type="password" name="email" className="input" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <label className="user-label">Senha</label>
        </div>

        <div className="compraContainer">
          <button className="button" type="submit"> Entrar </button>
        </div>

        <p>Ainda não tem uma conta? <span onClick={() => navigate('/cadastro')}>Cadastre-se</span></p>
      </form>
    </section>
  );
};

export default Login;



