import "../css/egame.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../img/background_img.png';

const Egame = () => {
  const [palpite, setPalpite] = useState('');
  const [pontos, setPontos] = useState(0);
  const [pilotos, setPilotos] = useState([]);  
  const [resultadoPalpite, setResultadoPalpite] = useState('');
  const [loading, setLoading] = useState(false); // Para indicar o estado de carregamento
  const navigate = useNavigate();

  // Verifica se o usuário está logado ao carregar o componente
  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      navigate('/login');
    }
  }, [navigate]);

  // Busca os pilotos ao carregar a página
  useEffect(() => {
    const fetchPilotos = async () => {
      try {
        const response = await axios.get('http://4.228.225.124:5000/api/game/status-corrida');
        setPilotos(response.data.pilotos); 
      } catch (err) {
        console.error(err);
        alert('Erro ao buscar pilotos');
      }
    };

    fetchPilotos();  
  }, []);

  // Armazenar o palpite no localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!palpite) {
      alert('Por favor, selecione um piloto!');
      return;
    }

    // Armazena o palpite localmente
    localStorage.setItem('palpite', palpite);
    alert('Palpite registrado! Aguarde o término da corrida.');
    setPalpite(''); // Limpa o campo do palpite
    setLoading(true); // Ativa o estado de carregamento
  };

  // Verifica o status da corrida e calcula os pontos quando finalizada
  useEffect(() => {
    const verificarStatusCorrida = async () => {
      try {
        const response = await axios.get('http://4.228.225.124:5000/api/game/status-corrida');
        const { status, pilotos } = response.data;

        // Atualiza os pilotos independentemente do status
        setPilotos(pilotos);

        if (status === 'finalizada') {
          const palpiteSalvo = localStorage.getItem('palpite');
          if (palpiteSalvo) {
            // Encontra o piloto escolhido com base no palpite armazenado
            const pilotoEscolhido = pilotos.find(p => p.piloto === palpiteSalvo);
            let pontosGanhos = 0;

            // Regras de pontuação
            pontosGanhos += pilotoEscolhido.ultrapassagem * 10;
            pontosGanhos -= pilotoEscolhido.ultrapassado * 3;
            const maiorVelocidade = Math.max(...pilotos.map(p => p.maiorVelocidade));
            if (pilotoEscolhido.maiorVelocidade === maiorVelocidade) {
              pontosGanhos += 20;
            }
            if (pilotoEscolhido.posicao === 1) {
              pontosGanhos += 25;
            } else if (pilotoEscolhido.posicao === 2) {
              pontosGanhos += 5;
            }

            // Exibe os pontos ganhos para o usuário
            setResultadoPalpite(`Você ganhou ${pontosGanhos} pontos com seu palpite no piloto ${palpiteSalvo}!`);
            setPontos(pontosGanhos);
            setLoading(false); // Desativa o estado de carregamento

            // Limpa o palpite armazenado no localStorage
            localStorage.removeItem('palpite');
          }
        } else {
          // Caso o status não seja "finalizada", manter o estado de aguardando
          setResultadoPalpite('Aguardando a finalização da corrida...');
        }
      } catch (error) {
        console.error('Erro ao verificar status da corrida:', error);
        alert('Erro ao buscar pilotos');
      }
    };

    // Verifica o status da corrida a cada 5 segundos
    const intervalId = setInterval(verificarStatusCorrida, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div id="backgroundImg">
        <img src={background} />
      </div>

      <section className="egame">
        <div className="titulo-container">
          <h2>E-game</h2>
        </div>
        <div className="race-space">
          <div id="tabela-container">
            <h1 id="race-last"> RESULTADO CORRIDA PASSADA</h1>
            <table className="tg">
              <thead>
                <tr>
                  <th className="tg-0lax">Posição</th>
                  <th className="tg-0lax">Piloto</th>
                  <th className="tg-0lax">Maior Velocidade</th>
                  <th className="tg-0lax">Ultrapassagens</th>
                  <th className="tg-0lax">Ultrapassado</th>
                </tr>
              </thead>
              <tbody>
                {pilotos
                  .sort((a, b) => a.posicao - b.posicao)
                  .map((piloto) => (
                    <tr key={piloto.id}>
                      <td className="tg-0lax">{piloto.posicao}º</td>
                      <td className="tg-0lax">{piloto.piloto}</td>
                      <td className="tg-0lax">{piloto.maiorVelocidade} km/h</td>
                      <td className="tg-0lax">{piloto.ultrapassagem}</td>
                      <td className="tg-0lax">{piloto.ultrapassado}</td>
                    </tr>
                  ))}
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
              <option value="">Selecione o piloto</option>
              {pilotos.map((piloto) => (
                <option key={piloto.id} value={piloto.piloto}>
                  {piloto.piloto}
                </option>
              ))}
            </select>

            <button type="submit" className="palpite-button" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Palpite'}
            </button>
          </form>

          <div className="resposta-palpite">
            {resultadoPalpite && <p>{resultadoPalpite}</p>}
          </div>
        </div>

        {/* Gráfico da corrida */}
        <div id="grafico-corrida">
          <iframe
            src="http://4.228.225.124:1880/ui"
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Node-RED Dashboard"
          />
        </div>

        {/* Seção de explicação do jogo */}
        <h2 id="race-last">Aprenda como jogar o Egame</h2>
        <div className="container-home">
          <div className="parent">
            <div className="card">
              <div className="logo">
                <span className="circle circle1" />
                <span className="circle circle2" />
                <span className="circle circle3" />
                <span className="circle circle4" />
                <span className="circle circle5">
                  <p className="comoJogarNum">1°</p>
                </span>
              </div>
              <div className="glass" />
              <div className="content">
                <span className="title">Analisar</span>
                <span className="text">
                  Dentro do E-game, analise a tabela da corrida passada para
                  fazer chute de quem vai ganhar
                </span>
              </div>
            </div>
          </div>

          <div className="parent">
            <div className="card">
              <div className="logo">
                <span className="circle circle1" />
                <span className="circle circle2" />
                <span className="circle circle3" />
                <span className="circle circle4" />
                <span className="circle circle5">
                  <p className="comoJogarNum">2°</p>
                </span>
              </div>
              <div className="glass" />
              <div className="content">
                <span className="title">Confiar</span>
                <span className="text">
                  Selecione um corredor e confirme seu chute
                </span>
              </div>
            </div>
          </div>

          <div className="parent">
            <div className="card">
              <div className="logo">
                <span className="circle circle1" />
                <span className="circle circle2" />
                <span className="circle circle3" />
                <span className="circle circle4" />
                <span className="circle circle5">
                  <p className="comoJogarNum">3°</p>
                </span>
              </div>
              <div className="glass" />
              <div className="content">
                <span className="title">Ganhar!</span>
                <span className="text">
                  Agora aguarde os resultados da corrida! Caso você acerte,
                  receberá pontos que podem ser trocados por prêmios!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Egame;

