import mongoose from 'mongoose';
import {SalleSchema } from '../models/salleModel'

const Salle = mongoose.model('Salle', SalleSchema);

/*POST
export const addNewSalle = (req, res) => {
        
    let newSalle = new Salle(req.body);
    newSalle.save()
    .then((salle) => {
        res.json(salle);
        console.log('Document créé :', salle);
    })
    .catch((error) => {
        res.send(error);
        console.log('Erreur lors de la création du document salle :', error);
    });
};*/
export const addNewSalle = (req, res) => {

    const salleNameLowercase = req.body.nomSalle.toLowerCase();

    // Vérifier si la salle existe déjà en utilisant un critère unique, par exemple le nom
   // Salle.findOne({ nomSalle: req.body.nomSalle })
    Salle.findOne({ nomSalle: { $regex: new RegExp(salleNameLowercase, 'i')}})
        .then(existingSalle => {
            if (existingSalle) {
                // Si la salle existe déjà, renvoyer une réponse d'erreur
                return res.status(400).json({ message: 'Une salle avec ce nom existe déjà.' });
            } else {
                // Si la salle n'existe pas encore, créer et sauvegarder la nouvelle salle
                let newSalle = new Salle(req.body);
                newSalle.save()
                    .then(salle => {
                        res.json(salle);
                        console.log('Document créé :', salle);
                    })
                    .catch(error => {
                        res.status(500).send(error);
                        console.log('Erreur lors de la création du document salle :', error);
                    });
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

/* GET */
export const getSalle = (req, res) => {
    Salle.find()
    .then((salle) => {
        console.log(salle);
        res.json(salle);
    })
    .catch((error) => {
        res.send(error);
    })
}
/* GET ID */
export const getSalleID = (req, res) => {
    Salle.findById(req.params.salleId)
    .then((salle) => {
        console.log(req.params.salleId);
        res.json(salle);
    })
    .catch((error) => {
        res.send(error);
    })
}

/**PUT 
export const updateSalle = (req, res) => {
    //console.log(req);
    Salle.findOneAndUpdate({_id: req.params.salleId}, req.body, { new: true} )
    .then((salle) => {
        
        res.json(salle);
    })
    .catch((error) => {
        res.send(error);
    })
}*/
export const updateSalle = (req, res) => {
    const salleNameLowercase = req.body.nomSalle.toLowerCase(); 
    // Vérifier si une autre salle existe déjà avec le même nom que celui que l'on souhaite mettre à jour
    Salle.findOne({ _id: { $ne: req.params.salleId }, nomSalle: {$regex: new RegExp(salleNameLowercase, 'i') } })
        .then(existingSalle => {
            if (existingSalle) {
                // Si une autre salle avec le même nom existe, renvoyer une réponse d'erreur
                return res.status(400).json({ message: 'Une salle avec ce nom existe déjà.' });
            } else {
                // Mettre à jour la salle
                Salle.findOneAndUpdate({ _id: req.params.salleId }, req.body, { new: true })
                    .then(salle => {
                        res.json(salle);
                    })
                    .catch(error => {
                        res.status(500).send(error);
                    });
            }
        })
        .catch(error => {
            res.status(500).send(error);
        });
};

/**DELET */
export const deletSalle = (req, res) => {
    Salle.deleteOne({_id: req.params.salleId})
    .then((salle) => {
        res.json({message: 'Effacer salle avec succés'});
    })
    .catch((error) => {
        res.send(error);
    })
}