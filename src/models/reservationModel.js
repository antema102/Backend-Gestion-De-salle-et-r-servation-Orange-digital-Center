import mongose from "mongoose";

const Schema = mongose.Schema;

export const ReservationSchema = new Schema({
    date_rdv : {
        type : Date,
    },
    heur_debut : {
        type : Date,
        required : true
    },
    heur_fin : {
        type : Date,
        required : true
    },
    trigram : {
        type : String,
    },
    description : {
        type : String,
    },
    salleID : {
        type :mongose.Types.ObjectId, ref : "Salle"
    },
    created_date : {
        type :Date,
        default : Date.now 
    }
 
})