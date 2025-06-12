const jwt = require('jsonwebtoken');

const generateJWT = (id = "") => {
    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "12h"},
            (error, token) => {
                if (error){
                    console.log(error);
                    reject(error);
                } else {
                    resolve(token);
                }
            }
        );
    });
}

module.exports = generateJWT;