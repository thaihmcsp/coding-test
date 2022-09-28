import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: {type: String, required: true},
    Email: {
        type: String, 
        required: true, 
        unique: true, 
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please choose a valid email']
    },
    Password: {type: String, required: true},
    Role: {type: String, enum:['user', 'admin'], default:'user'},
    Token: {type: String}
}, {collection: 'user', timestamps: true});

export const User = mongoose.model('user', UserSchema);