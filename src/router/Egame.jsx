import "../css/egame.css";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../img/background_img.png';

const Egame = () => {
  const [palpite, setPalpite] = useState('');
  const [pontos, setPontos] = useState(0);
  const [pilotos, setPilotos] = useState([]);  // Armazena os pilotos para o select
  const [resultadoPalpite, setResultadoPalpite] = useState('');
  const [loading, setLoading] = useState(false);
  const [corridaEmAndamento, setCorridaEmAndamento] = useState(false);  // Para indicar se a corrida está em andamento
  const [corridaTerminada, setCorridaTerminada] = useState(false); // Para indicar se a corrida terminou
  const [tentativasSemMudancas, setTentativasSemMudancas] = useState(0); // Para contar quantas tentativas sem mudanças
  const previousPilotos = useRef([]); // Armazena o estado anterior dos pilotos para comparar
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
        const response = await axios.get('http://4.228.225.124:5000/api/game/pilotos');
        setPilotos(response.data.pilotos);  
      } catch (err) {
        console.error(err);
        alert('Erro ao buscar pilotos');
      }
    };

    fetchPilotos();  // Chama a função ao carregar o componente
  }, []);

  // Atualiza os dados da corrida em tempo real quando o palpite for enviado
  useEffect(() => {
    if (corridaEmAndamento) {
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.get('http://4.228.225.124:5000/api/game/corridaAtual');  // Nova rota para dados da corrida atual
          const novosPilotos = response.data.pilotos;

          // Verifica se os dados mudaram em comparação com o estado anterior
          if (JSON.stringify(novosPilotos) === JSON.stringify(previousPilotos.current)) {
            setTentativasSemMudancas(tentativasSemMudancas + 1);
          } else {
            setTentativasSemMudancas(0); // Reinicia o contador se houver mudança
          }

          // Se os dados não mudarem por 3 tentativas consecutivas, finalize a corrida
          if (tentativasSemMudancas >= 3) {
            finalizarCorrida();
            clearInterval(intervalId);  // Para de buscar os dados em tempo real
          }

          // Atualiza os dados dos pilotos e o estado anterior
          setPilotos(novosPilotos);
          previousPilotos.current = novosPilotos;

        } catch (err) {
          console.error(err);
          alert('Corrida Finalizada!');
        }
      }, 5000);  // Atualiza a cada 5 segundos

      return () => clearInterval(intervalId);  // Limpa o intervalo quando o componente for desmontado
    }
  }, [corridaEmAndamento, tentativasSemMudancas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!palpite) {
      alert('Por favor, selecione um piloto!');
      return;
    }

    setLoading(true);
    const usuarioId = localStorage.getItem('usuarioId');

    try {
      const response = await axios.post('http://4.228.225.124:5000/api/game/palpite', {
        palpite,
        usuarioId
      });

      setPontos(response.data.total_pontos);
      setPilotos(response.data.pilotos);  // Atualiza os pilotos na tabela de resultados

      if (response.data.pontos_ganhos > 0) {
        setResultadoPalpite(`+${response.data.pontos_ganhos} pontos foram atualizados ao seu saldo. Agora seu saldo total atual é ${response.data.total_pontos}`);
      } else {
        setResultadoPalpite('Palpite incorreto, que pena... Você não ganhou nada, mas tente novamente!');
      }

      // Inicia a corrida em tempo real
      setCorridaEmAndamento(true);  // Inicia a exibição da corrida em tempo real

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Erro ao enviar palpite');
    } finally {
      setLoading(false);
    }
  };

  // Função para finalizar a corrida
  const finalizarCorrida = async () => {
    try {
      const response = await axios.post('http://4.228.225.124:5000/api/game/finalizarCorrida');
      alert(response.data.mensagem);
      setCorridaEmAndamento(false);  // Para de exibir a corrida em tempo real
      setCorridaTerminada(true); // Marca que a corrida terminou
      setTentativasSemMudancas(0); // Reseta o contador
    } catch (error) {
      console.error(error);
      alert('Erro ao finalizar a corrida');
    }
  };

  return (
    <>
      <div id="backgroundImg">
        <img src={background} alt="Background" />
      </div>

      <section className="egame">
        <div className="titulo-container">
          <h2>E-game</h2>
        </div>
        <div className="race-space">
          <div id="tabela-container">
            <h1 id="race-last">RESULTADO CORRIDA PASSADA</h1>
            {/* Tabela da corrida passada */}
            <table className="tg">
              <thead>
                <tr>
                  <th>Piloto</th>
                  <th>Velocidade</th>
                  <th>Ultrapassagens</th>
                  <th>Maior Velocidade</th>
                  <th>Posição</th>
                </tr>
              </thead>
              <tbody>
                {pilotos.map((piloto) => (
                  <tr key={piloto.id}>
                    <td>{piloto.piloto}</td>
                    <td>{piloto.velocidade} km/h</td>
                    <td>{piloto.ultrapassagem}</td> {/* Exibe o número de ultrapassagens */}
                    <td>{piloto.maiorVelocidade} km/h</td> {/* Exibe a maior velocidade */}
                    <td>{piloto.posicao}º</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tabela da corrida atual em tempo real */}
          {corridaEmAndamento && (
            <div id="tabela-corrida-atual-container">
              <h1 id="race-atual">RESULTADO CORRIDA ATUAL</h1>
              <table className="tg">
                <thead>
                  <tr>
                    <th>Piloto</th>
                    <th>Velocidade</th>
                    <th>Ultrapassagens</th>
                    <th>Maior Velocidade</th>
                    <th>Posição</th>
                  </tr>
                </thead>
                <tbody>
                  {pilotos.map((piloto) => (
                    <tr key={piloto.id}>
                      <td>{piloto.piloto}</td>
                      <td>{piloto.velocidade} km/h</td>
                      <td>{piloto.ultrapassagem}</td>
                      <td>{piloto.maiorVelocidade} km/h</td>
                      <td>{piloto.posicao}º</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

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

          {pilotos.length > 0 && (
            <div id="container-camp">
              <div id="resultado" className="bordaNeon">
                <p className="pilotosResultado">1° lugar: {pilotos[0].piloto}, com a velocidade total de: {pilotos[0].velocidade} km/h.</p>
                {pilotos.slice(1).map((piloto) => (
                  <p className="pilotosResultado" key={piloto.id}>
                    {piloto.posicao}º lugar: {piloto.piloto}, com a velocidade de: {piloto.velocidade} km/h, {piloto.ultrapassagem} ultrapassagens.
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Egame;
