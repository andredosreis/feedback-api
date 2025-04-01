const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Feedback API',
      version: '1.0.0',
      description: 'Documentação da API para gerenciamento de feedbacks',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
      {
        url:'https://feedback-api-36ex.onrender.com'
      }
    ],
  },
  apis: ['./routes/*.js'], // Caminho para ler as rotas e gerar a documentação
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
