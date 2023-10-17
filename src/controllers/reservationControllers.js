import mongoose, { mongo } from "mongoose";
import { ReservationSchema } from "../models/reservationModel";
import { SalleSchema } from "../models/salleModel";

const Reservation = mongoose.model('Reservation', ReservationSchema);


//function test salle reserver
export const isSalleAlreadyReserved = (salleID, heurDebut, heurFin) => {
    return Reservation.findOne({
        salleID: salleID,
        heur_debut: { $lt: heurFin },
        heur_fin: { $gt: heurDebut }
    })
    .then((reservation) => {
        return !!reservation; // Renvoie vrai si une réservation existe, sinon faux
    })
    .catch((error) => {
        throw error;
    });
};
//function format date 
const formatDate = (date) => {
    const dateISO = date; // Votre date au format ISO 8601

// Convertir la date ISO en objet Date JavaScript
    const dateObj = new Date(dateISO);

    // Obtenir les composantes de la date (année, mois, jour, heures, minutes)
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
    const day = String(dateObj.getDate()).padStart(2, '0');
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');

// Créer la date au format souhaité
const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

return formatDate;
}
/*POST*/

export const addNewReservation = (req, res) => {
    //Ajoutez ici la verification que vous souhaitez effectuer
    const salleID = req.body.salleID;
    const heurDebut = new Date(req.body.heur_debut);
    const heurFin = new Date(req.body.heur_fin);


    if(heurDebut >= heurFin) {
        return res.status(400).json({message: "L'heure de début doit être antérieure à l'heur de fin"})
    }

    isSalleAlreadyReserved(salleID, heurDebut, heurFin)
    .then((isReserved) => {
        if (isReserved) {
            return res.status(400).json({ message: 'La salle est déjà réservée pour cette période.' });
        }

        //si la vérification passe, alors ajoutez la nouvelle réservation à la base de données
        let newReservation = new Reservation(req.body);
        newReservation.save()
        .then((reservation) => {
            res.json(reservation);
            console.log('Documnet créé :', reservation);
        })
        .catch((error) => {
            res.send(error);
            console.log('Erreur lors de la création du document reservation : ', error);
        });
    })
    .catch((error) => {
        res.status(500).send(error);
    });
    
}

//GETID 
export const getReservationWithID = (req, res) => {
    Reservation.findById(req.params.reservationId)
    .then((reservation) => {
        res.json(reservation);
    })
    .catch((error) => {
        res.send(error)
    });
}

//GET
export const getReservation = (req, res) => {
    Reservation.find()
    .then((reservation) => {
        res.json(reservation);
        
    })
    .catch((error) => {
        res.send(error)
    })
}
//PUT
export const updateReservation = (req, res) => {

    const heurDebut = new Date(req.body.heur_debut);
    const heurFin = new Date(req.body.heur_fin);
   
    //test salle dispou si heur ne change pas 
    Reservation.findById(req.params.reservationId)
    .then((reservation) => {
        if (!reservation) {
            return res.status(404).json({message : 'Réservation introuvable.'})
        }
         //test heur valide 
        if(heurDebut >= heurFin) {
            return res.status(400).json({message: "L'heure de début doit être antérieure à l'heur de fin"})
        }

        if(reservation.heur_debut.getTime() !== heurDebut.getTime() || reservation.heur_fin.getTime() !== heurFin.getTime()){
            isSalleAlreadyReserved(req.body.salleID, heurDebut, heurFin)
            .then((isReserved) => {
                if (isReserved) {
                    return res.status(400).json({message: 'La salle est déjà réservée pour cette période.'});
                }
                console.log('Documnet Modifiér ' );
                Reservation.findOneAndUpdate({_id: req.params.reservationId}, req.body, {new: true})
                .then((reservation) => {
                    res.json(reservation);
                    console.log('Documnet Modifiér :', reservation);
                })
                .catch((error) => {
                    console.log('tonga1');
                    res.status(500).send(error);
                });      
            })
            .catch((error) => {
                console.log('tonga2');
                res.status(500).send(error);
            });
        } else {
            console.log('tonga3');
             // Si les heures de début et de fin n'ont pas été modifiées, mettre à jour directement
             Reservation.findOneAndUpdate({ _id: req.params.reservationId }, req.body, { new: true })
             .then((updatedReservation) => {
                 res.json(updatedReservation);
             })
             .catch((error) => {
                console.log('tonga4');
                 res.status(500).send(error);
             });
        }
        
    })
    .catch((error) => {
        console.log(error);
        res.status(500).send(error);
    });
}


//DELET
export const deletReservation = (req, res) => {
    Reservation.deleteOne({_id : req.params.reservationId})
    .then((reservation) => {
        res.json({message: 'Effacer reservation avec succés'. reservation});
    })
    .catch((error) => {
        res.send(error);
    })
}

/**affichage salle dans un reservation */
export const getReservationSalle = (req, res) => {
    Reservation.findById(req.params.reservationId)
   .populate('salleID') // Cette méthode peuple les données de la salle liée
   .then((reservation) => {
       if (!reservation) {
           return res.status(404).json({ message: 'Réservation introuvable.' });
       }

       res.json(reservation.salleID); // Renvoyer les données de la salle correspondante
   })
   .catch((error) => {
       res.status(500).json({ message: 'Erreur lors de la recherche de la réservation.', error: error.message });
   });
   
}
/* affichage reservation avec salle  */
export const getReservationSalles = (req, res) => {
    Reservation.findById(req.params.reservationId)
        .populate('salleID') // Cette méthode peuple les données de la salle liée
        .then((reservation) => {
            if (!reservation) {
                return res.status(404).json({ message: 'Réservation introuvable.' });
            }

            res.json({
                reservation: reservation,
                //salle: reservation.salleID // Les détails de la salle correspondante
            });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Erreur lors de la recherche de la réservation.', error: error.message });
        });
}

/*Réservation par Salle */

export const getReservationsBySalle = (req, res) => {
    const salleID = req.params.salleID;

    Reservation.find({ salleID: salleID })
        .populate('salleID') // Peupler les données de la salle liée
        .then((reservations) => {
            res.json(reservations);
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

