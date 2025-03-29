require('dotenv').config() // Carrega variáveis do arquivo .env
const express = require('express') // Importa o Express para criar o servidor
const connectDB = require('./db/db') // Importa o Mongoose para conectar ao MongoDB
const cors = require('cors')// Importa o CORS para permitir requisições de outras origens

const  { swaggerUi, specs } = require('./swagger')

// Importa as rotas do arquivo routes.js
const feedbackRoutes = require('./routes/feedbackRoutes')

const app = express() // Cria uma instância do Express

//middleware para ler json do corpo da requisição
app.use(express.json())

// Middleware para capturar erros de JSON inválido
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Erro de JSON:', err.message);
        return res.status(400).json({ error: true, message: 'JSON inválido na requisição' });
    }
    next();
});

//habilitar o cors de todas requisicoes
app.use(cors({ origin: '*'}))

app.use(express.json()) //Middleware para ler json do corpo da requisição

// Define as rotas do servidor
app.use('/', require('./routes/feedbackRoutes'))
app.use('/api/feedback', feedbackRoutes)



// Conecta ao banco de dados MongoDB

connectDB()

// habilitar o swagger

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))



// Inicia o servidor na porta 3000

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))