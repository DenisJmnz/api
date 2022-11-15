require('./connection');
const express = require('express');
const app = express();
const config = require('./modules/config');
const routerManufacters = require('./routes/manufacters');
const routerProducts = require('./routes/products');
const hostname = config.HOST;
const port = config.PORT;
const cors = require('cors');
app.use(cors());
app.use('/manufacters', routerManufacters);
app.use('/products', routerProducts);

app.use(express.static('../app/build'));

//ENDPOINT DE ERROR 
app.use((err, req, res, next) => {
    console.log(`Error: ${err}`);
    next();
})

app.use('/', (req, res, next) => {
    console.log('Endpoint de cierre');
    res.status(200).end();
});

app.listen(port, hostname, () => {
    console.log(`Servidor levantado con éxito en http://${hostname}:${port}/`);
   // console.log(`Entorno: ${process.env.NODE_ENV}`)
});