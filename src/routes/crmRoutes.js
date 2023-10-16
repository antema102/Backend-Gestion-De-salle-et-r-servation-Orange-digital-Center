

import {addNewContact, getContacts, getContactWithID, updateContact,deletContact} from '../controllers/crmControllers';
import { addNewReservation,updateReservation, getReservationWithID,getReservation,getReservationSalle, getReservationSalles,deletReservation, getReservationsBySalle,getReservationsByDateAndSalle } from '../controllers/reservationControllers';
import { addNewSalle, getSalle,getSalleID, updateSalle, deletSalle} from '../controllers/salleControllers';
import {connexion, registre} from '../controllers/authControllere';
import { pdf } from '../controllers/pdfExport';
const authMiddleware = require('../middleware/authMiddleware');

const routes = (app) => {
//CONTACT
    app.route('/contact')
        
        .get( (req, res, next) => {
        //     //middleware
             console.log(`Request de : ${req.originalUrl}`)
             console.log(`Request type : ${req.method}`)
             next();
         }, /*(req, res, next) => {
                 res.send('demande GET avec succès');
             }*/
            getContacts
            
         )
        //.get((req, res) => res.send(`demande GET avec succès`))
        .post(addNewContact);
        
    app.route('/contact/:contactId')
        .get(getContactWithID)// contact avec ID
        .put(updateContact)// mise à jour contact
        .delete(deletContact); //supprimer un contact
        
//ROUTE SALLE
    app.route('/salle')
        .post(addNewSalle)
        .get(authMiddleware,getSalle);// prendre toutes les salles.

        //.get((req, res) => res.send(`demande GET avec succès salle`))
    app.route('/salle/:salleId')
        .get(getSalleID)// contact avec ID
        .put(updateSalle)// mise à jour salle
        .delete(deletSalle); //supprimer un contact


//ROUTE RESERVATION
    app.route('/reservation/:reservationId')
        //.get(getReservationWithID);
        //.get(getReservationSalle)
        .get(getReservationSalles)
        .put(updateReservation)
        .delete(deletReservation);
    //recherch
    //app.route('reservations/:trigram')
    //.get(getReservationSalle);
    app.route('/reservation')
        .post(addNewReservation)
        .get(getReservation);
        //.get(getReservationSalle);
    app.route('/reservation/salle/:salleID')
        .get(getReservationsBySalle);

    //filtre pour avoir salle reservation entre deux date 
    app.route('/reservationfilter')
        .get(pdf);

//ROUTE AUTHENTIFICATION 
    app.route('/inscription')
        .post(registre);

//ROUTE CONNEXION
    app.route('/connexion')
        .post(connexion)

    }



    export default routes;
