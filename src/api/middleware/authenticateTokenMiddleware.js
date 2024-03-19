import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: 'Não foi possível encontrar a chave secreta!' });

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Token inválido ou expirado.' });

        if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
            req.userId = decoded.userId;
            req.userEmail = decoded.userEmail;
            return next();
        }

        return res.status(403).json({ error: 'Token inválido ou expirado.' });
    });
};

export default authenticateToken;