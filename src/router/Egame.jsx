import "../css/egame.css"
import { useState } from 'react';
import axios from 'axios';


const Egame = () => {
  const [palpite, setPalpite] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [pontos, setPontos] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioId = localStorage.getItem('usuarioId');  // Pega o ID do usuário armazenado após o login

    try {
      const response = await axios.post('http://localhost:5000/api/game/palpite', {
        palpite,
        usuarioId
      });

      setMensagem(response.data.mensagem);
      setPontos(response.data.total_pontos);

    } catch (err) {
      alert('Erro ao enviar palpite');
    }
  };

  return (
    <section className="egame">
    <div>
      <p>1: 'Lucas di Grassi - Mahindra Racing', velocidade: '200km/h'</p>
      <p>2: 'Nyck de Vries - Mahindra Racing', velocidade: '195km/h'</p>
      <p>3: 'Roberto Merhi - Mahindra Racing', velocidade: '190km/h'</p>
    </div>
      <h2>Faça seu palpite!</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          placeholder="Digite o número do jogador" 
          value={palpite} 
          onChange={(e) => setPalpite(e.target.value)} 
        />
        <button type="submit">Enviar Palpite</button>
      </form>

      {mensagem && <p>{mensagem}</p>}
      <p>Sua pontuação total: {pontos}</p>

      {/* Aqui você pode colocar o gráfico gerado */}
      <div id="grafico-corrida">
        {/* Gráfico da corrida gerado a partir do C++ */}
      </div>
    </section>
  );
};

export default Egame;
