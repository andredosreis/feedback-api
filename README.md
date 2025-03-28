# Feedback API

## 📌 Sobre o Projeto
Esta API permite a criação, leitura, atualização e exclusão (CRUD) de feedbacks.

A API está documentada com **Swagger** e foi implantada no **Render**, tornando-a acessível online.

## 🚀 Tecnologias Utilizadas
- **Node.js** com Express
- **MongoDB** com Mongoose
- **Swagger** para documentação
- **Render** para deploy
- **Postman** para testes

## 🔗 Link da API no Render
A API está disponível publicamente em:
👉 [Feedback API - Render] https://feedback-api-36ex.onrender.com/

## 📄 Documentação no Swagger
Acesse a documentação interativa para testar os endpoints:
👉 [Swagger UI] https://feedback-api-36ex.onrender.com//api-docs

## 🔧 Como Rodar o Projeto Localmente

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/seu-usuario/feedback-api.git
cd feedback-api
```

### 2️⃣ Instale as Dependências
```bash
npm install
```

### 3️⃣ Configure o Banco de Dados
Crie um arquivo **`.env`** na raiz do projeto e adicione:
```env
PORT=3000
MONGODB_URI=sua-string-de-conexao-do-mongo
```

### 4️⃣ Inicie o Servidor
```bash
npm run dev
```
A API estará rodando em `http://localhost:3000`

## 🌐 Endpoints da API

### 🔍 1. Obter todos os feedbacks
**GET** `/api/feedback`
```json
[
  {
    "_id": "6612fc89a1234567890",
    "title": "Ótimo serviço!",
    "description": "A experiência foi incrível!",
    "rating": 5
  }
]
```

### 📝 2. Criar um novo feedback
**POST** `/api/feedback`
```json
{
  "title": "Novo Feedback",
  "description": "Muito útil!",
  "rating": 5
}
```

### ✏️ 3. Atualizar um feedback existente
**PUT** `/api/feedback/{id}`
```json
{
  "title": "Feedback Atualizado",
  "description": "Agora está corrigido!",
  "rating": 4
}
```

### 🗑️ 4. Deletar um feedback
**DELETE** `/api/feedback/{id}`
```json
{
  "message": "Feedback removido com sucesso!"
}
```


