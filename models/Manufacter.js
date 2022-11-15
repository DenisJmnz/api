const { model, Schema } = require('mongoose');

//Creamos esquema
const manufacterSchema = new Schema({
    name: String,
    cif: String,
    address: String
});

//Creamos modelo
const Manufacter = model('Manufacter', manufacterSchema);

module.exports = Manufacter;