const express = require('express');
const User = require('../models/User');
const router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: list all of users
 *     responses:
 *       200:
 *         description: list of users returned successfully
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error('Err to find users:', err);
        res.status(500).json({ error: 'Err to find users' });
    }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cria um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: user created successfully
 *       400:
 *         description: file missing or invalid
 */


router.post('/', async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ error: 'File missing or invalid' });
    }
    try {
        const { name, email, password } = req.body;
        await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully!' });
    } catch (err) {
        console.error('Err to create user:', err);
        res.status(500).json({ error: 'Err to create user' });
    }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', async (req, res) => {
    const { name, email } = req.body;
  
    if (!name || !email) {
      return res.status(400).json({ error: 'Nome e e-mail são obrigatórios' });
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      res.json({ message: 'Usuário atualizado com sucesso!', user: updatedUser });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  });
  
  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Remove um usuário existente
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID do usuário a ser removido
   *     responses:
   *       200:
   *         description: Usuário removido com sucesso
   *       404:
   *         description: Usuário não encontrado
   */
  router.delete('/:id', async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      res.json({ message: 'Usuário removido com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao remover usuário' });
    }
  });
  

module.exports = router;