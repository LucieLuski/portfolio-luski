const webToken = require('jsonwebtoken');
const { default: httpStatus } = require('http-status');

module.exports = (req, res, next) => {
    //recupere token 
    //verifie si bien signé par la clé
    // recup et envoi l'id decodé
    try {
        const authHeader = req.headers.authorization;

        // Vérifie que le header existe et commence par "Bearer"
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Token manquant ou mal formé' });
        }

        const token = req.headers.authorization.split(' ')[1];
        webToken.verify(token, process.env.JWT_KEY);

        req.auth = { role: 'admin' };
        next();
    } catch (error) {
        res.status(httpStatus.UNAUTHORIZED).json({ error });
    }
};