const express = require('express');
const routes = require('./rutas');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});

// Cors permite que un cliente se conecta a otro servidor para el intercambio de recursos

const cors = require('cors');

// conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://devmcgann:Hola440150@clusterfiesta-xtun3.mongodb.net/test?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// crear el servidor
const app = express();

// habilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const whitelist = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: (origin,callback) => {
        const existe = whitelist.some(dominio => dominio === origin);
        if(existe) {
            callback(null,true);
        }else{
            callback(new Error("ha ha haaa... No permitido"));
        }
    }
}

// Habilitar cors
app.use(cors());



// Rutas de la app
app.use('/', routes());

// carpeta publica
app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;
app.set('port', (process.env.PORT || 5000));


if(process.env.NODE_ENV === 'production') {
    app.use(express.static("FrontAlternativo/build"));

    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, "FrontAlternativo","build", "index.html"));
    });
}

// iniciar la app
app.listen(PORT , () => {
    console.log("servidor corriendo")
})