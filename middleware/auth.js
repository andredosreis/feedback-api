const jwt = require('jsonwebtoken')


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']

    // Verifica se o cabeçalho de autorização está presente e começa com "Bearer"

    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token){
        return res.status(401).json({ error: 'Token is missing or invalid' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded // opcional, mas útil para saber quem está logado
        next() // continua para a próxima função de middleware ou rota
    } catch (error) {
        return res.status(403).json({ error: 'IVALID TOKEN' })
    }
}

module.exports = authenticateToken