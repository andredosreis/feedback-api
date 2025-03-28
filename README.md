# Feedback API

Esta API simples permite o envio, listagem, atualização e remoção de feedbacks. O projeto foi desenvolvido usando **Node.js**, **Express** e **MongoDB** com **Mongoose**.

## Instalação

Clone o projeto:

```bash
git clone <URL-do-seu-repositório>
cd feedback-api
npm install
```

## Configuração

Crie um arquivo `.env`:

```env
MONGODB_URI=<sua-url-mongodb>
PORT=3000
```

## Executar

Para rodar localmente:

```bash
npm run dev
```

## Endpoints

### Listar Feedbacks

`GET /api/feedback`

Retorna todos os feedbacks.

### Criar Feedback

`POST /api/feedback`

Body:

```json
{
  "title": "Ótimo",
  "description": "Gostei muito!",
  "rating": 5
}
```

### Atualizar Feedback

`PUT /api/feedback/:id`

Body:

```json
{
  "title": "Atualizado",
  "description": "Mudança de opinião",
  "rating": 4
}
```

### Remover Feedback

`DELETE /api/feedback/:id`

Remove o feedback pelo ID.

## Testes

Teste os endpoints usando Postman ou Thunder Client.

## Swagger (Opcional)

Se desejar, utilize Swagger para documentação interativa.

## Licença

MIT License.
