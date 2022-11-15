const { Router } = require('express');
const router = Router();
const { getProducts, getProductsBrandAndColor, getProductsColor, getProductsBrand, getProductAndManufacter, getProductsBrandColorAndPrice, getProductsPrice, getProductsBrandAndPrice } = require('../services/serviceProducts.js');

router.get('/', async (request, response, next) => {
  try {
    const { page } = request.query;
    let docs = await getProducts(page);
    console.log(docs);
    docs = docs.docs.map(elem => {
      const { name, color, price } = elem;
      return { name, color, price };
    });
    response.json([{page}, docs]).status(200);
  } catch (err) { next(err) }
});

router.get('/search', async (req, res) => { // url/products/search?color='red'
  const { brand, color, price, pageN } = req.query;
  let docs = {};
  
  if (brand && color && price) {
    docs = await getProductsBrandColorAndPrice(brand, color, price);
  } else if(brand && color && !price) {
    docs = await getProductsBrandAndColor(brand, color);
  } else if (!brand && color && !price) {
    docs = await getProductsColor(color);
  } else if(!brand && !color && price) {
    docs = await getProductsPrice(price);
  } else if(brand && !color && price) {
    docs = await getProductsBrandAndPrice(brand, price);
  }  else if(!brand && !color && !price) {
    console.log('ENTRAMOS AQUI');
    docs = await getProducts(pageN);
  }  else {
    docs = await getProductsBrand(brand);
  }

  if (docs) {
    console.log('Resultados', docs);
    const { page, totalPages } = docs;
    docs = docs.docs.map(elem => {
      const { name, color, price } = elem;
      return { name, color, price };
    })
    res.json({page, totalPages, products: docs}).status(200).end()
  } else {
    res.json({ result: 'No hay resultados' }).status(404).end()
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    const docs = await getProductAndManufacter(request.params.id);
    console.log("DATOS", docs);
    response.json(docs).status(200);
  } catch (err) { next(err) }
});

module.exports = router;