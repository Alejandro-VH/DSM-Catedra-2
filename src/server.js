const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/database');
const User = require('./models/user');
const Book = require('./models/book'); 
const Loan = require('./models/loan'); 

class Server {
    constructor() {
        this.app = express();

        this.port = process.env.PORT;

        this.server = require('http').createServer(this.app);

        // No aplicado para dejar sin prefijo las rutas y coincida con el archivo entregado
        this.paths = {
            //books: '/api/book',
            //loans: '/api/loan',
            //users: '/api/user'
        };

        // Database
        this.dbConnection();

        // JSON
        this.app.use(express.json());

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async dbConnection() {
        try {
        await db.authenticate();
        await User.sync({force: false});
        await Book.sync({force: false});
        await Loan.sync({force: false});
        console.log('Database connected successfully');
        }catch(error){
            console.log(error);
        }
    }

    middlewares() {
        // Morgan
        this.app.use(morgan('dev'));

        // Body parser
        this.app.use(express.json());
        
        // CORS
        this.app.use(cors());

    }

    routes() {
        this.app.use(require("./routes/book.routes"));
        this.app.use(require('./routes/loan.routes'));
        this.app.use(require('./routes/user.routes'));
    }

    listen() {
        // Start server
        this.app.listen(this.port, () => {
            console.log(`Server running in port: http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;