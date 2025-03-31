const express = require('express');
const Feedback = require('../models/Feedback');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('The server is up and running');
});


/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Retorna todos os feedbacks
 *     responses:
 *       200:
 *         description: Lista de feedbacks retornada com sucesso
 */
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (err) {
        console.error('Erro ao buscar feedbacks:', err);
        res.status(500).json({ error: 'Erro ao buscar feedbacks' });
    }
});

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Adiciona um novo feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Feedback criado com sucesso
 */
router.post('/', async (req, res) => {
    try {
        const { title, description, rating } = req.body;

        if (!title || !description || !rating) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const newFeedback = new Feedback({ title, description, rating });
        await newFeedback.save();

        res.status(201).json({ message: 'Feedback criado com sucesso!' });
    } catch (err) {
        console.error('Erro ao criar feedback:', err);
        res.status(500).json({ error: 'Erro ao criar feedback' });
    }
});
/**
 * @swagger
 * /api/feedback/{id}:
 *   put:
 *     summary: Atualiza um feedback existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do feedback a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               rating:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Feedback atualizado com sucesso
 *       400:
 *         description: Requisição inválida, campos faltando
 *       404:
 *         description: Feedback não encontrado
 */
router.put('/:id', async (req, res) => {
    try {
        const feedbackId = req.params.id;
        const { title, description, rating } = req.body;

        
        if (!title || !description || typeof rating !== 'number') {
            return res.status(400).json({
                error: 'Todos os campos (title, description, rating) são obrigatórios e rating deve ser um número'
            });
        }

        const updatedFeedback = await Feedback.findByIdAndUpdate(
            feedbackId,
            { title, description, rating },
            { new: true, runValidators: true }
        );

        if (!updatedFeedback) {
            return res.status(404).json({ error: 'Feedback não encontrado' });
        }

        res.json({ message: 'Feedback atualizado com sucesso!', feedback: updatedFeedback });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar feedback' });
    }
});

/**
 * @swagger
 * /api/feedback/{id}:
 *   delete:
 *     summary: Remove um feedback existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do feedback a ser removido
 *     responses:
 *       200:
 *         description: Feedback removido com sucesso
 *       404:
 *         description: Feedback não encontrado
 */
router.delete('/:id', async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);

        if (!deletedFeedback) {
            return res.status(404).json({ error: 'Feedback não encontrado' });
        }

        res.json({ message: 'Feedback removido com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao remover feedback' });
    }
});

module.exports = router;
