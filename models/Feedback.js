const mongoose = require('mongoose');

// Definindo o modelo (schema) do Feedback

const feedbackSchema = new mongoose.Schema({

// titulo do feedback, obrigatório
    title : {
        type: String,
        required: true
    },
     // descrição do feedback, obrigatório
    description: { type: String, 
        required: true },
       

    // avaliação do feedback, obrigatório, de 1 a 5
        rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },  
    // data de criação do feedback, opcional, padrão é a data atual
    createdAt: {
        type: Date,
        default: Date.now

    }
});

module.exports = mongoose.model('Feedback', feedbackSchema); // Exportando o modelo para ser usado em outros arquivos