const mongoose = require('mongoose');
const user = 'denisbbdd';
const passwd = '1234ddbb';
const database = 'concessionaire';
const connectionString = `mongodb+srv://${user}:${passwd}@cluster0.ktvc2qg.mongodb.net/${database}?retryWrites=true&w=majority`
//Conexión a mongodb
mongoose.connect(connectionString)
    .then(() => {
        console.log('Dabase connected')
    }).catch(err => {
        console.error(err)
    })

module.exports = mongoose;
