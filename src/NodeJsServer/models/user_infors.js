import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    user_name: String,
    pass_word: String,
    email: String,
    permisson: String
});
userSchema.methods.validatePass = function (password) {
    return bcrypt.compareSync(password, this.password);
}
const user = mongoose.model('user_infors',userSchema);
export default user;