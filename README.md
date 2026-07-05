# 🏠 Controle de Gastos Residenciais

Sistema completo para gerenciamento de pessoas e transações financeiras, com consulta de totais por pessoa e geral. Desenvolvido como parte de um desafio técnico para estágio em TI.

---

## ✨ Funcionalidades

### 👥 Cadastro de Pessoas
- Criar, listar e remover pessoas.
- Cada pessoa possui **nome** e **idade**.
- Identificador único gerado automaticamente.
- Ao excluir uma pessoa, todas as suas transações são removidas em cascata.

### 💸 Cadastro de Transações
- Criar e listar transações (não é permitida edição ou exclusão).
- Campos: descrição, valor, tipo (despesa ou receita) e pessoa associada.
- Regra de negócio: **menores de 18 anos só podem registrar despesas** (receitas são bloqueadas).
- Validação de existência da pessoa no cadastro.

### 📊 Consulta de Totais
- Exibe uma tabela com todas as pessoas, mostrando:
  - Total de receitas
  - Total de despesas
  - Saldo (receita – despesa)
- Rodapé com **total geral** (soma de todas as receitas, despesas e saldo líquido).

---

## 🚀 Tecnologias Utilizadas

### Backend
- **.NET 8** com ASP.NET Core Web API
- **Entity Framework Core** com **SQLite** (banco de dados leve e portátil)
- **Swagger** para documentação interativa da API
- **Injeção de dependência**, **DTOs** e **serviços** desacoplados

### Frontend
- **React** com **TypeScript**
- **Vite** para build ultrarrápido
- **React Router** para navegação SPA
- **Axios** para chamadas HTTP
- **React Icons** para ícones modernos
- **CSS puro** com variáveis, responsividade e tema limpo

---

## 📁 Estrutura do Repositório

controle-gastos/
├── backend/                     # Projeto .NET Web API
│   ├── Controllers/             # Endpoints REST
│   ├── Services/                # Lógica de negócio
│   ├── Models/                  # Entidades do banco (Person, Transaction)
│   ├── Data/                    # DbContext e configurações do EF Core
│   ├── DTOs/                    # Objetos de transferência de dados
│   ├── Migrations/              # Migrações do banco de dados
│   ├── Program.cs               # Configuração da aplicação
│   ├── ControleGastos.API.csproj
│   └── appsettings.json
├── frontend/                    # Aplicação React + Vite
│   ├── src/
│   │   ├── api/                 # Serviços de comunicação com a API
│   │   ├── components/          # Componentes reutilizáveis
│   │   ├── pages/               # Páginas da aplicação
│   │   ├── types/               # Tipos TypeScript
│   │   ├── App.tsx              # Rotas principais
│   │   └── index.css            # Estilos globais (responsivo)
│   ├── package.json
│   └── vite.config.ts
└── README.md


## ⚙️ Pré-requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- Gerenciador de pacotes npm (vem com o Node)

---

## 🔧 Como Executar o Projeto

### 1. Backend (API)

# Acesse a pasta do backend
cd backend

# Restaure as dependências e execute as migrações (já é automático ao rodar)
dotnet run --urls "http://localhost:5065"


A API estará disponível em "http://localhost:5065".  
Acesse "http://localhost:5065/swagger" para visualizar e testar os endpoints.

### 2. Frontend

Em outro terminal:

# Acesse a pasta do frontend
cd frontend

# Instale as dependências (somente na primeira vez)
npm install

# Inicie o servidor de desenvolvimento
npm run dev

O frontend abrirá em "http://localhost:5173" (ou a porta informada pelo Vite).

---

## 📮 Endpoints da API

| Método | Rota                | Descrição                              |
|--------|---------------------|----------------------------------------|
| GET    | /api/persons        | Lista todas as pessoas                 |
| POST   | /api/persons        | Cria uma nova pessoa                   |
| DELETE | /api/persons/{id}   | Remove uma pessoa e suas transações    |
| GET    | /api/transactions   | Lista todas as transações              |
| POST   | /api/transactions   | Cria uma nova transação (valida idade) |
| GET    | /api/totals         | Totais por pessoa e geral              |

---

## 🎨 Interface e Usabilidade

- **Página Inicial (Dashboard):** resumo financeiro com cards de receita, despesa e saldo, além de atalhos para as principais ações.
- **Cadastro de Pessoas:** formulário simples e lista com opção de excluir.
- **Cadastro de Transações:** autocomplete inteligente para buscar a pessoa pelo nome; campo de tipo de transação desabilitado automaticamente quando a pessoa for menor de idade.
- **Totais:** tabela com valores positivos em verde e negativos em vermelho, adaptada para dispositivos móveis (os dados se transformam em cartões empilhados).
- **Responsividade:** layout adaptado para celulares, tablets e desktops.

---

## 📝 Regras de Negócio Implementadas

- ✅ CRUD de pessoas (criação, listagem, exclusão).
- ✅ Exclusão em cascata: deletar pessoa remove todas as suas transações.
- ✅ Cadastro de transações apenas com criação e listagem (sem edição/deleção).
- ✅ Validação: pessoa informada na transação deve existir.
- ✅ Menor de 18 anos: apenas despesas permitidas (regra aplicada no backend e no frontend).
- ✅ Identificadores únicos e automáticos para pessoas e transações.
- ✅ Totais por pessoa e geral, com saldo (receita – despesa).

---

## 🧪 Testes (Opcional)

O projeto foi preparado para receber testes unitários com xUnit e banco de dados em memória, garantindo a qualidade do código e a validação das regras de negócio. Os testes podem ser adicionados sem impactar a aplicação principal.

---

## 📈 Critérios de Avaliação Atendidos

- **Aderência às regras de negócio:** todas as especificações foram implementadas.
- **Atenção aos detalhes:** validações no front e back, mensagens de erro amigáveis, tratamento de exceções, responsividade e experiência do usuário.
- **Qualidade e legibilidade do código:** arquitetura em camadas, uso de DTOs, serviços, injeção de dependência, tipagem estática com TypeScript, componentes bem definidos.
- **Boas práticas:** CORS configurado, logging, Swagger, migrações automáticas, organização de pastas, separação de responsabilidades.
