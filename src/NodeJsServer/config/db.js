import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/NodeJsDemo');
const db = mongoose.connection;
db.on('err',()=>{
    console.log('Failed to conect');
});
db.once('open',()=>{
    console.log('MongoDB connected');
});
export default db;

