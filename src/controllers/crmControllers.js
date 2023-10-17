import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

/* POST */
export const addNewContact = (req, res) => {

    let newContact = new Contact(req.body);

    newContact.save()
        .then((contact) => {
            res.json(contact);
            console.log('Document créé :', contact);
        })
        .catch((error) => {
            res.send(error);
            console.log('Erreur lors de la création du doccument :', error);
        });
};

/** GET */
export const getContacts = (req, res) => {
    Contact.find()
        .then((contact) => {
            res.json(contact);
        })
        .catch((error) => {
            res.send(error);
        })
}

/**GETID */
export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactId)
        .then((contact) => {
            res.json(contact);
        })
        .catch((error) => {
            res.send(error);
        })

}

/*PUT*/
export const updateContact = (req, res) => {
    Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true })
        .then((contact) => {
            res.json(contact);
        })
        .catch((error) => {
            res.send(error);
        })
}

/*DELET*/
export const deletContact = (req, res) => {
    Contact.deleteOne({ _id: req.params.contactId })
        .then((contact) => {
            res.json({ message: 'Effacer contact avec succés' });
        })
        .catch((error) => {
            res.send(error);
        })
}