const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
 *      
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
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }
    
    try{
      const hashedPassword = await bcrypt.hash(password, 10); // 10 é o número de rounds de hash
      const user = new User({ name, email, password: hashedPassword });

      const newUser = new User({ name, email, password: hashedPassword });

      await user.save();
      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
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
  
  
  
  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     summary: Login de usuário e geração de token JWT
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login bem-sucedido e token gerado
   *       400:
   *         description: Dados inválidos
   *       401:
   *         description: Credenciais inválidas
   */
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Validação simples
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }
  
    try {
      // Verifica se o usuário existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
  
      // Compara a senha com a hash no banco
      const senhaCorreta = await bcrypt.compare(password, user.password);
      if (!senhaCorreta) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
  
      // Gera o token JWT
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ message: 'Login bem-sucedido!', token });
    } catch (err) {
      console.error('Erro no login:', err);
      res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  });
  

 
module.exports = router;