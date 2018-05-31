import mongoose from 'mongoose';
const emailSchema = mongoose.Schema({
    email: String
});
const email = mongoose.model('email_verifys',emailSchema);
export default email;