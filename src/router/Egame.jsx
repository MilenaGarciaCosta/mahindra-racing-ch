import "../css/egame.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Egame = () => {
  const [palpite, setPalpite] = useState('');
  const [pontos, setPontos] = useState(0);
  const [pilotos, setPilotos] = useState([]);
  const [resultadoPalpite, setResultadoPalpite] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!palpite) {
      alert('Por favor, selecione uma posição!');
      return;
    }

    setLoading(true);
    const usuarioId = localStorage.getItem('usuarioId');

    try {
      const response = await axios.post('http://localhost:5000/api/game/palpite', {
        palpite,
        usuarioId
      });

      setPontos(response.data.total_pontos);
      setPilotos(response.data.pilotos);

      if (response.data.pontos_ganhos > 0) {
        setResultadoPalpite(`Palpite Correto! +10 pontos foram atualizados ao seu saldo. Agora seu saldo total atual é ${response.data.total_pontos}`);
      } else {
        setResultadoPalpite('Palpite incorreto, que pena... Você não ganhou nada, mas tente novamente!');
      }

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Erro ao enviar palpite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="egame">
      <div className="titulo-container">
        <h2>E-game</h2>
      </div>
      <div className="race-space">
        <div id="tabela-container">
          <h1 id="race-last">CORRIDA PASSADA</h1>
          <table className="tg">
            <thead>
              <tr>
                <th className="tg-0lax">Piloto</th>
                <th className="tg-0lax">Equipe</th>
                <th className="tg-0lax">Pontos</th>
                <th className="tg-0lax">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tg-0lax">Nick Cassidy</td>
                <td className="tg-0lax">JAGUAR TCS RACING</td>
                <td className="tg-0lax">167</td>
                <td className="tg-0lax">50</td>
              </tr>
              <tr>
                <td className="tg-0lax">Pascal Wehrlein</td>
                <td className="tg-0lax">TAG HEUER PORSCHE FORMULA E TEAM</td>
                <td className="tg-0lax">142</td>
                <td className="tg-0lax">47</td>
              </tr>
              <tr>
                <td className="tg-0lax">Mitch Evans</td>
                <td className="tg-0lax">JAGUAR TCS RACING</td>
                <td className="tg-0lax">132</td>
                <td className="tg-0lax">44</td>
              </tr>
            </tbody>
          </table>
        </div>
      

      <h2 id="race-last">Faça seu palpite!</h2>
      <form onSubmit={handleSubmit} className="palpite-form">
        <select
          name="seletor3"
          id="seletor3"
          value={palpite}
          onChange={(e) => setPalpite(e.target.value)}
          className="palpite-select"
        >
          <option value="">Selecione a posição</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
        </select>
        <button type="submit" className="palpite-button" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Palpite'}
        </button>
        
      </form>
      <div className="resposta-palpite">
      {resultadoPalpite && <p>{resultadoPalpite}</p>}
      </div>
      
      
      {pilotos.length > 0 && (
        <div id="container-camp">
        <div id="resultado">
          
          <p>O piloto vencedor foi: {pilotos[0].piloto}, com a velocidade total de: {pilotos[0].velocidade} km/h.</p>
          {pilotos.slice(1).map((piloto) => (
            <p key={piloto.id}>
              {piloto.posicao}º lugar: {piloto.piloto}, com a velocidade de: {piloto.velocidade} km/h.
            </p>
          ))}
        </div>
        </div>
      )}
</div>
      <div id="grafico-corrida">
      <iframe
        src="http://20.206.203.235:1880/ui"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Node-RED Dashboard"
      />

      </div>
    </section>
  );
};

export default Egame;
