import { useState } from 'react';
import axios from 'axios';
import '../css/cadastro.css';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { email, senha });
      alert('Cadastro realizado com sucesso');
    } catch (err) {
      alert('Erro no cadastro');
    }
  };

  return (
    <section className="cadastro">
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
        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
};

export default Cadastro;