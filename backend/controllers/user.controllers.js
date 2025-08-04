const User = require('../models/user');
const bcrypt = require('bcrypt')
const { default: code } = require('http-status');
const webToken = require('jsonwebtoken');

exports.login = (req, res) => {
    //res : userId + token crypté
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(code.UNAUTHORIZED).json({ message: 'identifiant/mot de passe incorrect' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            return res.status(code.UNAUTHORIZED).json({ message: 'identifiant/mot de passe incorrect' });
                        } else {
                            res.status(code.OK).json({
                                token: webToken.sign(
                                    { role: 'admin' },
                                    process.env.JWT_KEY,
                                    { expiresIn: '6h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(code.INTERNAL_SERVER_ERROR).json({ error }));
            }
        })
        .catch(error => res.status(code.INTERNAL_SERVER_ERROR).json({ error }));
}