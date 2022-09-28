"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    Name: { type: String, required: true },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please choose a valid email']
    },
    Password: { type: String, required: true },
    Role: { type: String, enum: ['user', 'admin'], default: 'user' },
    Token: { type: String }
}, { collection: 'user', timestamps: true });
exports.User = mongoose_1.default.model('user', UserSchema);
