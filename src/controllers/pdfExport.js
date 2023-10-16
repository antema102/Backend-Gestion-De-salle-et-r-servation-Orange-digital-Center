const fs = require('fs');
const PDFDocument = require('pdfkit');
import {getReservationsByDateAndSalle} from "../controllers/reservationControllers";

export const pdf = (req,res) => {
    //donnees param 
    const salleID = req.body.salleID;
    const startDate = new Date(req.body.startDate); // Date de début du filtre
    const endDate = new Date(req.body.endDate); // Date de fin du filtre

    // Créez un nouveau document PDF
    const doc = new PDFDocument();
    const dat = new Date();
    const dateAujourdhui = dat.toISOString().replace(/[-T:.]/g, '_');
    const pdfFilePath = `D:/kezya/ODC/projet TEST/pdf/savepdf${dateAujourdhui}.pdf`;

    // Pipez le contenu du PDF vers un fichier
    doc.pipe(fs.createWriteStream(pdfFilePath));
    //maka donnees base 
    const data = getReservationsByDateAndSalle(salleID,startDate,endDate); 
    /*data.map(element => {
        // Ajoutez du contenu au PDF
        doc.text(`ID: ${element._id}, Nom salle: ${element.salleID.nomSalle}, TRIGRAM: ${element.trigram}`);
        doc.moveDown();
    });*/
    
 
    


    // Ajoutez une image au PDF (assurez-vous que l'image existe)
    //doc.image('chemin/vers/votre/image.jpg', 100, 100, { width: 200 });

    // Finalisez le PDF et terminez le flux
    doc.end();

    console.log(`Le fichier PDF a été créé : ${pdfFilePath}`);
}

