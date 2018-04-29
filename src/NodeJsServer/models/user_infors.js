import mongoose from 'mongoose';
const productSchema = mongoose.Schema({
    user_name: String,
    pass_word: String,
    email: String
});
const user = mongoose.model('user_infors',productSchema);
export default user;