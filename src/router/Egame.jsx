import "../css/egame.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../img/background_img.png';

const Egame = () => {
  const [palpite, setPalpite] = useState('');
  const [pontos, setPontos] = useState(0);
  const [pilotos, setPilotos] = useState([]);  // Armazena os pilotos para o select
  const [resultadoPalpite, setResultadoPalpite] = useState('');
  const [loading, setLoading] = useState(false);
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
        const response = await axios.get('http://4.228.225.124:5000/api/game/pilotos'); // Nova rota para buscar pilotos
        setPilotos(response.data.pilotos);  // Atualiza a lista de pilotos no estado
      } catch (err) {
        console.error(err);
        alert('Erro ao buscar pilotos');
      }
    };

    fetchPilotos();  // Chama a função ao carregar o componente
  }, []);
/*
  // Função para salvar palpite localmente
const handlePalpite = async (e) => {
  e.preventDefault();
  if (!palpite) {
    alert('Por favor, selecione um piloto!');
    return;
  }
  localStorage.setItem('palpite', palpite);
  alert('Palpite salvo localmente! Agora aguarde o resultado.');
};

// Função para exibir resultado e calcular pontos
const handleExibirResultado = async () => {
  setLoading(true);
  const usuarioId = localStorage.getItem('usuarioId');
  const palpiteLocal = localStorage.getItem('palpite');

  try {
    const response = await axios.get('http://4.228.225.124:5000/api/game/status');

    if (response.data.status === 'finalizada') {
      // Realiza o cálculo de pontos baseado nas regras definidas
      const resultado = await axios.post('http://4.228.225.124:5000/api/game/palpite', {
        palpite: palpiteLocal,
        usuarioId,
      });

      setPontos(resultado.data.total_pontos);
      setPilotos(resultado.data.pilotos);

      setResultadoPalpite(resultado.data.pontos_ganhos > 0 
        ? `+${resultado.data.pontos_ganhos} pontos foram atualizados ao seu saldo.`
        : 'Palpite incorreto, que pena... Você não ganhou nada, mas tente novamente!'
      );
    } else {
      alert('A corrida ainda não foi finalizada.');
    }
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    alert('Erro ao verificar o status da corrida');
  } finally {
    setLoading(false);
  }
};

 /* const handleSubmit = async (e) => {
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
        setResultadoPalpite(`+10 pontos foram atualizados ao seu saldo. Agora seu saldo total atual é ${response.data.total_pontos}`);
      } else {
        setResultadoPalpite('Palpite incorreto, que pena... Você não ganhou nada, mas tente novamente!');
      }

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Erro ao enviar palpite');
    } finally {
      setLoading(false);
    }
  };*/

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
        usuarioId,
      });
  
      if (response.data.status === 'finalizada') {
        // Exibe o resultado com o cálculo de pontos
        setPontos(response.data.total_pontos);
        setPilotos(response.data.pilotos);
  
        setResultadoPalpite(
          response.data.pontos_ganhos > 0 
            ? `Palpite Correto! +${response.data.pontos_ganhos} pontos foram atualizados ao seu saldo.`
            : 'Palpite incorreto, que pena... Você não ganhou nada, mas tente novamente!'
        );
      } else {
        alert('A corrida ainda não foi finalizada. Aguarde o término para ver os resultados.');
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Erro ao enviar palpite ou verificar status da corrida.');
    } finally {
      setLoading(false);
    }
  };

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
                  .sort((a, b) => a.posicao - b.posicao)  // Ordena pela posição (1º, 2º, 3º)
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

          <button onClick={handleExibirResultado} className="palpite-button">
            Exibir Resultado
          </button>

          <div className="resposta-palpite">
            {resultadoPalpite && <p>{resultadoPalpite}</p>}
          </div>

          {pilotos.length > 0 && (
            <div id="container-camp">
              <div id="resultado" className="bordaNeon">
                <p className="pilotosResultado">1° lugar: {pilotos[0].piloto}, com a velocidade total de: {pilotos[0].velocidade} km/h.</p>
                {pilotos.slice(1).map((piloto) => (
                  <p className="pilotosResultado" key={piloto.id}>
                    {piloto.posicao}º lugar: {piloto.piloto}, com a velocidade de: {piloto.velocidade} km/h.
                  </p>

                ))}
              </div>
            </div>
          )}

        </div>
        <div id="grafico-corrida">
          <iframe
            src="http://4.228.225.124:1880/ui"
            style={{ width: '100%', height: '100%', border: 'none' }}
            title="Node-RED Dashboard"
          />
        </div>

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

