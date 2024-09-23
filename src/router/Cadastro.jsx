
import { useState } from 'react';
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
    <section className="cadastro">
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder="Código de Divulgação (opcional)" 
          value={codigoDivulgacao} 
          onChange={(e) => setCodigoDivulgacao(e.target.value.toUpperCase())} 
          maxLength={6}
        />
        <button type="submit">Cadastrar</button>
      </form>
    </section>
  );
};

export default Cadastro;

