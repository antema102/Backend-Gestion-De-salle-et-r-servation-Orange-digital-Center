# Gestion de Salles - Orange Digital Center Madagascar

Ce projet est un backend pour la gestion des salles à l'Orange Digital Center Madagascar. Il fournit des fonctionnalités pour la gestion des réservations de salles, la visualisation des détails des salles disponibles, la création et la suppression de réservations, ainsi que la gestion de l'authentification des utilisateurs.

## Fonctionnalités

- Gestion des réservations de salles
- Visualisation des détails des salles disponibles
- Création, mise à jour et suppression de réservations
- Authentification des utilisateurs

## Technologies Utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose

## Configuration

1. Assurez-vous d'avoir Node.js et MongoDB installés localement.
2. Clonez ce référentiel sur votre machine.
3. Exécutez `npm install` pour installer toutes les dépendances.
4. Configurez les variables d'environnement requises, le cas échéant.
5. Exécutez `npm start` pour lancer le serveur.

## API Endpoints

### Salles

- `GET /salle` - Récupère toutes les salles disponibles.
- `GET /salle/:salleId` - Récupère les détails d'une salle spécifique.
- `POST /salle` - Ajoute une nouvelle salle.
- `PUT /salle/:salleId` - Met à jour les informations d'une salle.
- `DELETE /salle/:salleId` - Supprime une salle.

### Réservations

- `GET /reservation` - Récupère toutes les réservations.
- `GET /reservation/:reservationId` - Récupère les détails d'une réservation spécifique.
- `POST /reservation` - Crée une nouvelle réservation.
- `PUT /reservation/:reservationId` - Met à jour les informations d'une réservation.
- `DELETE /reservation/:reservationId` - Supprime une réservation.

### Authentification

- `POST /inscription` - Crée un nouveau compte utilisateur.
- `POST /connexion` - Connecte un utilisateur existant.

## Contribution

Les contributions à ce projet sont les bienvenues. Assurez-vous de discuter des changements que vous souhaitez apporter en créant une "issue" ou en ouvrant une "pull request".

## Auteurs
- Antema Nirina - antema103@gmail.com
