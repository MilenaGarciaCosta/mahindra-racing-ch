# Formula E - E-game & Loja Virtual

## Descrição

O projeto permite que os usuários conheçam mais sobre o que é a Formula E, interajam por meio de um fórum e participem de um E-game, onde podem adivinhar o piloto vencedor da corrida e ganhar pontos para trocar por itens na loja virtual. O sistema inclui um programa de indicação, onde os usuários podem divulgar códigos para amigos, ganhando pontos com as indicações, promovendo assim a FormulaE.

## Funcionalidades

- **Cadastro e Login**: Geração de códigos de divulgação únicos e premiação com 100 pontos para o novo usuário e o divulgador.
- **E-game**: Adivinhe o vencedor da corrida para ganhar pontos.
- **Loja Virtual**: Troque seus pontos por itens.
- **Fórum**: Descubra mais pessoas que também se interessam por Formula E, abra discussões e se divirta.

## Tecnologias

- **Frontend**: React.js, Axios, CSS, Tailwind
- **Backend**: Node.js, Express, Sequelize (ORM), MySQL, Socket.io, Nodemon

## Como Rodar o Projeto

### Requisitos

- Node.js (v14+), MySQL, Navegador

### Passos

```bash
# Clone o repositório e instale as dependências
git clone (https://github.com/MilenaGarciaCosta/mahindra-racing-ch.git)
npm install

# Inicie o backend
cd backend
node server.js
cd..
cd server
npm run dev

# Inicie o frontend
cd src
npm run dev

# Aviso
# Ative o servidor da nuvem para conexão com o banco de dados MySQL antes de iniciar a aplicação.

