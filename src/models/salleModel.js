import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const SalleSchema = new Schema({
    nomSalle : {
        type : String,
        required : 'Entrer un nom de salle'
    },
    capaciteSalle : {
        type : Number
    },
    couleurSalle : {
        type : String
    },
   // type :{type : mongoose.Types.ObjectId, ref : "category"},
    created_date : {
        type : Date,
        default : Date.now
    }
})