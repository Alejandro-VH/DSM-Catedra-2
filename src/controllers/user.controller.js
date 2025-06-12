const { response, request } = require("express");
const User = require('../models/user');
const bcrypt = require("bcrypt");
const generateJWT = require("../utils/GenerateJWT");
const jwt = require("jsonwebtoken");

const register = async (req = request, res = response) => {
    try {
        const { name, last_name, email, password } = req.body;

        if (!name || !last_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Debe rellenar los campos obligatorios",
            });
        }

        // Validar si ya existe un usuario con el mismo email
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                error: true,
                message: "El correo ingresado ya está en uso",
            });
        }

        // Creamos usuario
        const userData = { name, last_name, password, email };
        const user = await User.create(userData);

        // hasheamos su contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id);

        const return_data = { name, last_name, email, token };
        return res.status(201).json({
            success: true,
            error: false,
            data: return_data,
            message: "Te has registrado correctamente",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al registrar el usuario",
        });
    }
}

const login = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Debe rellenar los campos obligatorios",
            });
        }

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Las credenciales no son correctas",
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "Las credenciales no son correctas",
            });
        }

        // Generamos token
        const token = await generateJWT(user.id);

        const { name, last_name, email: userEmail } = user;

        const dataUser = { name, last_name, email: userEmail, token };

        return res.status(200).json({
            success: true,
            data: dataUser,
            message: "Has iniciado sesión correctamente",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al iniciar sesión",
        });
    }
}

const me = async (req = request, res = response) => {
    try {
        const userId = req.user.id;
        console.log("User ID:", userId);
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "No se encontró el usuario",
            });
        }

        res.status(200).json({ user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Error al obtener los datos del usuario",
        });
    }
}

module.exports = {
    register,
    login,
    me
};