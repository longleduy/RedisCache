import mongoose from 'mongoose';
const productSchema = mongoose.Schema({
    id: Number,
    name: String,
    img: String,
    description: String,
    price: Number,
    inventory: Number,
    rate: Number
});
const product = mongoose.model('products',productSchema);
export default product;