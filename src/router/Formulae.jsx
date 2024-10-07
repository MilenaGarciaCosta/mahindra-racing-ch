import { useState } from "react";
import "../css/formula.css";
import Carro1 from "../img/carro1.png";
import Carro2 from "../img/carro2.png";
import Carro3 from "../img/carro3.png";
import Linha from "../img/linha.png";
import background from '../img/background_img.png';

const Formula = () => {
  // Estado para armazenar dados da geração
  const [geracao, setGeracao] = useState("gen1");

  // Dados das gerações
  const dadosGeracoes = {
    gen1: {
      imagem: Carro1,
      ano: "2014 - 2017",
      textoInicial: `Fabricado pela <span className="span">Dallara</span className="span"> em parceria com a <span className="span">Spark Racing Technology</span className="span">.`,
      velocidadeMaxima: "225 km/h",
      aceleracao: "0 a 100 km/h <span className='span'>em 3 segundos</span>",
      textoMotor: `Os motores foram feitos pela <span className="span">McLaren Electronic Systems</span className="span">, tinham três modos:`,
      motorData: `
        <div><h2 class="h2todos">normal</h2><p>200kw</p></div>
        <div><h2 class="h2todos">econômico</h2><p>150kw</p></div>
        <div><h2 class="h2todos">push to pass</h2><p>230kw</p></div>`,
    },
    gen2: {
      imagem: Carro2,
      ano: "2018 - 2021",
      textoInicial: `O carro manteve a <span className='span'>composição de fibra de carbono e alumínio</span className="span">, mas ganhou um <span className="span">design mais agressivo e futurista</span className="span">. <p>Introdução do <span className="span">Halo</span className="span">, um dispositivo de segurança que protege a cabeça do piloto, inicialmente criticado, mas posteriormente reconhecido por sua eficácia em salvar vidas.</p>`,
      velocidadeMaxima: "280 km/h",
      aceleracao: "0 a 100 km/h <span className='span'>em 2,8 segundos</span>",
      textoMotor: `A partir da segunda temporada, cada equipe pôde escolher sua própria fornecedora de motores.`,
      motorData: `
        <div><h2 class="h2todos">normal</h2><p>200kw</p></div>
        <div><h2 class="h2todos">ataque</h2><p>225kw</p></div>
        <div><h2 class="h2todos">fan boost</h2><p>250kw</p></div>`,
    },
    gen3: {
      imagem: Carro3,
      ano: "Geração atual",
      textoInicial: `A autonomia da bateria foi aprimorada, agora os carros possuem <span className="span">dois motores</span className="span">: um para funcionamento e outro para regeneração de energia. A meta é que <span className="span">40% da eletricidade usada nas corridas seja gerada pelas freadas dos pilotos</span className="span">, tornando o Gen 3 o carro elétrico mais eficiente do mundo.`,
      velocidadeMaxima: "320 km/h",
      aceleracao: "0 a 100 km/h <span className='span'>em 1,86 segundos</span>",
      textoMotor: `Os motores foram feitos pela <span className="span">McLaren Electronic Systems</span className="span">, mas a partir da segunda temporada, cada equipe pôde escolher sua própria fornecedora de motores;`,
      motorData: `
        <div><h2 class="h2todos">normal</h2><p>300kw</p></div>
        <div><h2 class="h2todos">ataque</h2><p>350kw</p></div>`,
    },
  };

  // Função para alterar a geração
  const alterarConteudo = (novaGeracao) => {
    setGeracao(novaGeracao);
  };

  return (
    <>
      <div id="backgroundImg">
        <img src={background} />
      </div>

      <div className="main">

        <div className="titulo-container">
          <h2>Formula E</h2>
          <h4>Campeonato de automobilismo elétrico</h4>
        </div>

        <img src={Linha} id="img-linha" alt="linha do tempo Formula E" />

        <div className="proposta">
          <h3 id="titulo-conteudo">Sobre a Fórmula E</h3>
          <p id="text">
            A Fórmula E foi criada para ser um campeonato de monopostos elétricos
            em pistas de rua temporárias dentro das cidades. A ideia se
            concretizou em <span className="span">13 de setembro de 2014</span>, com o
            <span className="span"> ePrix</span> de Pequim, a
            <span className="span"> primeira corrida da categoria</span>.
          </p>
          <p id="text">
            A Fórmula E &nbsp;
            <span className="span">
              desempenha para os veículos elétricos o mesmo papel que a Fórmula 1
              teve para os veículos a combustão</span>: testar novas tecnologias que eventualmente chegam aos carros
            elétricos de passeio. No início, os pilotos precisavam trocar de carro
            durante a corrida devido à baixa autonomia das baterias. Hoje, as
            baterias possuem
            <span className="span"> 150% mais autonomia e duram a corrida inteira.</span>
          </p>
        </div>

        <div className="container">
          <div className="genButton">
            <div className="btnTds">
              <button className="btn" onClick={() => alterarConteudo("gen1")}>
                Geração 1
              </button>
              <button className="btn" onClick={() => alterarConteudo("gen2")}>
                Geração 2
              </button>
              <button className="btn" onClick={() => alterarConteudo("gen3")}>
                Geração 3
              </button>
            </div>
          </div>
        </div>

        <div className="container-info">
          <div className="descricao-container">
            <h2 className="ano h2todos">{dadosGeracoes[geracao].ano}</h2>
            <div
              className="texto-inicial"
              dangerouslySetInnerHTML={{ __html: dadosGeracoes[geracao].textoInicial }}
            />
            <div className="velocidade-conteiner">
              <div>
                <h2 className="h2todos">Velocidade máxima</h2>
                <p id="velocidade-max">{dadosGeracoes[geracao].velocidadeMaxima}</p>
              </div>
              <div>
                <h2 className="h2todos">Aceleração</h2>
                <p
                  id="aceleracao"
                  dangerouslySetInnerHTML={{ __html: dadosGeracoes[geracao].aceleracao }}
                />
              </div>
            </div>
            <h2 className="h2todos">Motor</h2>
            <p
              className="texto-motor"
              dangerouslySetInnerHTML={{ __html: dadosGeracoes[geracao].textoMotor }}
            />
            <div
              className="motor-conteiner"
              dangerouslySetInnerHTML={{ __html: dadosGeracoes[geracao].motorData }}
            />
          </div>
          <img src={dadosGeracoes[geracao].imagem} className="imagem-carro" alt={`Carro ${geracao}`} />
        </div>
      </div>
    </>
  );
};

export default Formula;
