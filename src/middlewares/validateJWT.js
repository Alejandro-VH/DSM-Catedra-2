const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
    const authHeader = req.headers['authorization'];
    token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            succes: false,
            error: true,
            message: "No tienes un token",
        });
    }
    console.log("TOKEN RECIBIDO:", token);

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(401).json({
                success: false,
                error: true,
                message: "Usuario no encontrado",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                error: true,
                message: "El token ha expirado",
                expired: true,
                error
            });
        }
        console.error(error);

        return res.status(401).json({
            success: false,
            error: true,
            message: "Token inválido",
        })
    }
}

module.exports = validateJWT;

