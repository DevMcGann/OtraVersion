const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitadosSchema = new Schema({
    nombre: {
        type: String,
        trim : true
    },
    apellido : {
        type: String,
        trim : true
    },
    dni : {
        type: String,
        trim: true
    },
    presente: {
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Invitados', invitadosSchema);