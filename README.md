Gestion de salles - Orange Digital Center Madagascar
Ce projet est un backend pour la gestion des salles à l'Orange Digital Center Madagascar. Il permet de gérer les réservations de salles, les informations sur les salles disponibles, les détails des réservations actives, etc.

Fonctionnalités
Gestion des réservations de salles
Visualisation des détails de la salle
Création, modification et suppression des réservations
Vérification de la disponibilité des salles
Technologies utilisées
Node.js
Express.js
MongoDB
Mongoose
Configuration
Assurez-vous d'avoir Node.js et MongoDB installés localement.
Clonez ce référentiel sur votre machine.
Exécutez npm install pour installer toutes les dépendances.
Configurez les variables d'environnement requises dans un fichier .env en vous basant sur le fichier .env.example.
Exécutez npm start pour démarrer le serveur.
API Endpoints
GET /api/salles - Récupère toutes les salles disponibles.
GET /api/salles/:id - Récupère les détails d'une salle spécifique.
POST /api/reservations - Crée une nouvelle réservation.
PUT /api/reservations/:id - Met à jour une réservation existante.
DELETE /api/reservations/:id - Supprime une réservation existante.
Contribution
Les contributions à ce projet sont les bienvenues. Assurez-vous de discuter des changements que vous souhaitez apporter en créant une "issue" ou en ouvrant une "pull request".

Auteurs
Antema NIrina
Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.
