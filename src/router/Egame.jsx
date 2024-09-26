import "../css/egame.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Egame = () => {
  const [palpite, setPalpite] = useState('');
  const [pontos, setPontos] = useState(0);
  const [pilotos, setPilotos] = useState([]);
  const [resultadoPalpite, setResultadoPalpite] = useState(''); // Nova variável de estado
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      // Se não houver usuarioId, redirecione para o login
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuarioId = localStorage.getItem('usuarioId');  // Pega o ID do usuário armazenado após o login

    try {
      const response = await axios.post('http://localhost:5000/api/game/palpite', {
        palpite,
        usuarioId
      });

      setPontos(response.data.total_pontos);
      setPilotos(response.data.pilotos); // Armazena os pilotos recebidos

      // Define a mensagem personalizada com base no resultado
      if (response.data.pontos_ganhos > 0) {
        setResultadoPalpite(`Palpite Correto! +10 pontos foram atualizados ao seu saldo. Agora seu saldo total atual é ${response.data.total_pontos}`);
      } else {
        setResultadoPalpite('Palpite incorreto, que pena... Você não ganhou nada, mas tente novamente!');
      }

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Erro ao enviar palpite');
    }
  };

  return (
    <section className="egame">
      <div className="titulo-container">
        <h2>E-game</h2>
      </div>
      <h2>Faça seu palpite!</h2>
      <div>
        <h1>CORRIDA PASSADA</h1>
        <p>1: Lucas di Grassi - Mahindra Racing, velocidade: 200km/h</p>
        <p>2: Nyck de Vries - Mahindra Racing, velocidade: 195km/h</p>
        <p>3: Roberto Merhi - Mahindra Racing, velocidade: 190km/h</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Digite a posição do jogador que você acha que ganhará na próxima corrida"
          value={palpite}
          onChange={(e) => setPalpite(e.target.value)}
        />
        <button type="submit">Enviar Palpite</button>
      </form>

      {/* Exibe a mensagem personalizada após o palpite */}
      {resultadoPalpite && <p>{resultadoPalpite}</p>}

      {/* Exibe os pilotos após receber a resposta */}
      {pilotos.length > 0 && (
        <div>
          <p>O piloto vencedor foi: {pilotos[0].piloto}, com a velocidade total de: {pilotos[0].velocidade} km/h.</p>
          {pilotos.slice(1).map((piloto) => (
            <p key={piloto.id}>
              {piloto.posicao}º lugar: {piloto.piloto}, com a velocidade de: {piloto.velocidade} km/h.
            </p>
          ))}
        </div>
      )}


      <div id="grafico-corrida">
        <p>Aqui em baixo vai ter a importação do gráfico</p>
        <div>
      <iframe 
        src="http://20.206.203.235:1880/ui" 
        width="100%" 
        height="500px" 
        style={{ border: 'none' }} 
        title="Iframe Example"
      ></iframe>
    </div>
      </div>
    </section>
  );
};

export default Egame;



