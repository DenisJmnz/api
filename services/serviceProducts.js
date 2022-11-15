const Product = require('../models/Product.js')


const getProducts = async (page = 1) => {
    return await Product.paginate({}, { page, sort: { ['price']: 1 } , limit: 5 });
}

const getProductsBrandAndColor = async (brand, color) => {
    return await Product.find({ 'manufacter.name':brand, 'color':color }).exec();
}

const getProductsBrandColorAndPrice = async (brand, color, price) => {
    return await Product.find({ 'manufacter.name':brand, 'color':color, 'price': { $lte: price } }).exec();
}

const getProductsColor = async (color) => {
    return await Product.find({ 'color':color }).exec();
}

const getProductsBrandAndPrice = async (brand, price) => {
    return await Product.find({ 'manufacter.name':brand, 'price': { $lte: price } }).exec();
}

const getProductsPrice = async (price) => {
    return await Product.find({'price': { $lte: price }}).exec();
}

const getProductsBrand = async (brand) => {
    return await Product.find({ 'manufacter.name':brand }).exec();
}

const getProductAndManufacter = async (id) => {
    const product = await Product.findById(id).populate('manufacter._id').exec();
    return {
        ...product._doc,
        manufacter: {
            ...product.manufacter._id._doc
        }
    }
}

module.exports = { getProducts, getProductsBrandAndColor, getProductsColor, getProductsBrand, getProductAndManufacter, getProductsBrandColorAndPrice, getProductsPrice, getProductsBrandAndPrice };