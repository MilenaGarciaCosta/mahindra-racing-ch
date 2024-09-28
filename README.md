# Formula E - E-game & Loja Virtual

## Descrição

O projeto permite que os usuários participem de um E-game, onde podem adivinhar o piloto vencedor da corrida e ganhar pontos para trocar por itens na loja virtual. O sistema inclui um programa de indicação, onde os usuários podem divulgar códigos para amigos, ganhando pontos com as indicações, promovendo assim a FormulaE.

## Funcionalidades

- **Cadastro e Login**: Geração de códigos de divulgação únicos e premiação com 100 pontos para o novo usuário e o divulgador.
- **E-game**: Adivinhe o vencedor da corrida para ganhar pontos.
- **Loja Virtual**: Troque seus pontos por itens.

## Tecnologias

- **Frontend**: React.js, Axios, CSS
- **Backend**: Node.js, Express, Sequelize (ORM), MySQL

## Como Rodar o Projeto

### Requisitos

- Node.js (v14+), MySQL, Navegador

### Passos

```bash
# Clone o repositório e instale as dependências
git clone https://github.com/seu-usuario/formula-e.git
npm install

# Inicie o backend
cd backend
node server.js

# Inicie o frontend
cd src
npm run dev

# Aviso
# Ative o servidor da nuvem para conexão com o banco de dados MySQL antes de iniciar a aplicação.

