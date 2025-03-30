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



module.exports = router;