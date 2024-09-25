
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import '../css/cadastro.css';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [codigoDivulgacao, setCodigoDivulgacao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        email,
        senha,
        codigo_divulgacao: codigoDivulgacao.trim().toUpperCase() || undefined
      });

      const { codigo_unico } = response.data;
      alert(`Cadastro realizado com sucesso! Divulgue este código: ${codigo_unico} para amigos e receba 100 pontos.`);

      // Opcional: Redirecionar ou limpar o formulário após o sucesso
      setEmail('');
      setSenha('');
      setCodigoDivulgacao('');
    } catch (err) {
      alert('Erro no cadastro: ' + (err.response?.data?.error || ''));
    }
  };

  return (
    <section className="main loginContainer">

      <form className='form-login' onSubmit={handleSubmit}>
        <div className="titulo-container">
          <h2>Cadastro</h2>
        </div>

        <div className="input-group">
          <input required type="text" name="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label className="user-label">Email</label>
        </div>

        <div className="input-group">
          <input required type="password" name="email" className="input" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <label className="user-label">Senha</label>
        </div>

        <div className="input-group">
          <input required type="text" className="input" value={codigoDivulgacao} onChange={(e) => setCodigoDivulgacao(e.target.value.toUpperCase())} maxLength={6}/>
          <label className="user-label">Código de divulgação</label>
        </div>

        <div className="compraContainer">
          <button className="button" type="submit"> Cadastrar </button>
        </div>

        <Link to="/login"><p>Já tem uma conta? Entre</p></Link>
      </form>
    </section>
  );
};

export default Cadastro;

