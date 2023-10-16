import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName : {
        type : String,
        required : 'Entrer un prénon'
    },
    lastName : {
        type : String,
        required : 'Entrer un prénon'
    },
    email : {
        type : String
    },
    phone : {
        type : Number
    },
    created_date : {
        type : Date,
        default : Date.now
    }
    
});

