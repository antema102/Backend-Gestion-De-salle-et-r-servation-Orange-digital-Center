export const updateReservation = (req, res) => {
    const newHeurDebut = new Date(req.body.heur_debut);
    const newHeurFin = new Date(req.body.heur_fin);

    Reservation.findById(req.params.reservationId)
        .then((reservation) => {
            if (!reservation) {
                return res.status(404).json({ message: 'Réservation introuvable.' });
            }

            if (newHeurDebut >= newHeurFin) {
                return res.status(400).json({ message: "L'heure de début doit être antérieure à l'heure de fin" });
            }

            // Vérifier la disponibilité uniquement si les heures de début et de fin ont été modifiées
            if (reservation.heur_debut !== req.body.heur_debut || reservation.heur_fin !== req.body.heur_fin) {
                isSalleAlreadyReserved(req.body.salleID, newHeurDebut, newHeurFin)
                    .then((isReserved) => {
                        if (isReserved) {
                            return res.status(400).json({ message: 'La salle est déjà réservée pour cette période.' });
                        }

                        Reservation.findOneAndUpdate({ _id: req.params.reservationId }, req.body, { new: true })
                            .then((updatedReservation) => {
                                res.json(updatedReservation);
                            })
                            .catch((error) => {
                                res.status(500).send(error);
                            });
                    })
                    .catch((error) => {
                        res.status(500).send(error);
                    });
            } else {
                // Si les heures de début et de fin n'ont pas été modifiées, mettre à jour directement
                Reservation.findOneAndUpdate({ _id: req.params.reservationId }, req.body, { new: true })
                    .then((updatedReservation) => {
                        res.json(updatedReservation);
                    })
                    .catch((error) => {
                        res.status(500).send(error);
                    });
            }
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
