import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
    user_name: {type: String, required: true},
    pass_word: String,
    email: {type: String, required: true},
    permisson: {type: String, required: true},
    provider: {type: String, required: true},
    active: {type: Boolean, required: true}
});
userSchema.methods.validatePass = function (password) {
    return bcrypt.compareSync(password, this.password);
}
const user = mongoose.model('user_infors',userSchema);
export default user;