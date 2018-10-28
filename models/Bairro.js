var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bairro = new Schema({
    nome: {
        type:String,
        unique: true
    },
    casos: Number,
});

module.exports = mongoose.model('Bairro', Bairro);