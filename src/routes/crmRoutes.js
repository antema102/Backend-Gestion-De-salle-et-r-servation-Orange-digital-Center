

import { addNewContact, getContacts, getContactWithID, updateContact, deletContact } from '../controllers/crmControllers';
import { addNewReservation, updateReservation, getReservationWithID, getReservation, getReservationSalle, getReservationSalles, deletReservation, getReservationsBySalle, getReservationsByDateAndSalle } from '../controllers/reservationControllers';
import { addNewSalle, getSalle, getSalleID, updateSalle, deletSalle } from '../controllers/salleControllers';
import { connexion, registre } from '../controllers/authControllere';
const authMiddleware = require('../middleware/authMiddleware');

const routes = (app) => {

    //ROUTE SALLE
    app.route('/salle')
        .post(addNewSalle) //Ajouter une nouvelle salle
        .get(authMiddleware, getSalle);// prendre toutes les salles.

    app.route('/salle/:salleId')
        .get(getSalleID)// contact avec ID
        .put(updateSalle)// mise à jour salle
        .delete(deletSalle); //supprimer un contact


    //ROUTE RESERVATION AVEC ID
    app.route('/reservation/:reservationId')
        .get(getReservationSalles)
        .put(updateReservation)
        .delete(deletReservation);

    //Selectionner toute les salles
    app.route('/reservation') //Trouver tout les salles
        .post(addNewReservation)
        .get(getReservation);
    //.get(getReservationSalle);
    app.route('/reservation/salle/:salleID')
        .get(getReservationsBySalle);

    //ROUTE AUTHENTIFICATION Crée une admis
    app.route('/inscription')
        .post(registre);

    //ROUTE CONNEXION 
    app.route('/connexion')
        .post(connexion)

}



export default routes;
