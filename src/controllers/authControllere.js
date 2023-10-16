import mongoose from "mongoose";
import { UserSchema } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const User = mongoose.model('User', UserSchema);

/** POST inscription */
export const registre = async (req, res) => {
    try {
        const { username, password } = req.body;
    
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
          return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
        }
    
        // Hachez le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Créez un nouvel utilisateur
        const user = new User({ username, password: hashedPassword });
        await user.save();
    
        res.status(201).json({ message: 'Utilisateur créé avec succès.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
      }
}

/**POST connexion */
export const connexion = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Recherchez l'utilisateur dans la base de données
      const user = await User.findOne({ username: username });
  
      if (!user) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
      }
  
      // Vérifiez le mot de passe
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
      }
  
      // Générez un jeton JWT
      const token = jwt.sign({ userId: user._id }, 'votre_clé_secrète',{expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
  }
  