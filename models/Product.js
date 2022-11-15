const { model, Schema } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

//Creamos esquema
const productSchema = new Schema({
    name: String,
    price: Number,
    color: String,
    manufacter: {
        _id: { type: Schema.Types.ObjectId, ref: 'Manufacter' },
        name: String
    }
});

productSchema.plugin(mongoosePaginate);

const Product = model('Product', productSchema);

module.exports = Product;