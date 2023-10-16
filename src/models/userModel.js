import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
});

const User = mongoose.model('User', UserSchema);


