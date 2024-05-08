import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addAudience } from '../services/audienceService';

const AddUserModal = ({ show, onHide, setAudiences }) => {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',  // Ajout de l'e-mail aux données du formulaire
        role: '',
        statut: '',
        nomUtilisateur: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAjouterUtilisateur = async () => {
        try {
            const donneesUtilisateur = {
                prenom: formData.prenom,
                nom: formData.nom,
                email_data: formData.email,
                role_data: formData.role,
                nom_utilisateur_data: formData.nomUtilisateur,
                statut_data: formData.statut,
            };
            const nouvelUtilisateur = await addAudience(donneesUtilisateur);
            if (nouvelUtilisateur) {
                setAudiences(audiences => [...audiences, nouvelUtilisateur]);
                onHide();  // Fermer la fenêtre modale
                alert('Utilisateur ajouté avec succès.');
            }
        } catch (error) {
            console.error('Échec de l\'ajout de l\'utilisateur:', error);
            alert('Échec de l\'ajout de l\'utilisateur.');
        }
    };

    useEffect(() => {
        if (!show) {
            setFormData({
                prenom: '',
                nom: '',
                nomUtilisateur: '',
                email: '',
                role: '',
                statut: ''
            });
        }
    }, [show]);

    return (
        <Modal show={show} onHide={onHide} dialogClassName='showDialog' centered={true} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un nouvel utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Prénom</label>
                            <input type="text" className="form-control" name="prenom" value={formData.prenom} onChange={handleInputChange} placeholder="Prénom" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nom</label>
                            <input type="text" className="form-control" name="nom" value={formData.nom} onChange={handleInputChange} placeholder="Nom" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nom d'utilisateur</label>
                            <input type="text" className="form-control" name="nomUtilisateur" value={formData.nomUtilisateur} onChange={handleInputChange} placeholder="Nom d'utilisateur" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Statut</label>
                            <select className="form-control" name="statut" value={formData.statut} onChange={handleInputChange}>
                                <option value="">Sélectionner</option>
                                <option value="En cours">En cours</option>
                                <option value="Arrivé">Arrivé</option>
                                <option value="En retard">En retard</option>
                                <option value="En attente">En attente</option>
                                <option value="Approuvé">Approuvé</option>
                                <option value="Rejeté">Rejeté</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Rôle</label>
                            <select className="form-control" name="role" value={formData.role} onChange={handleInputChange}>
                                <option value="">Sélectionner</option>
                                <option value="Manager">Manager</option>
                                <option value="Utilisateur">Utilisateur</option>
                                <option value="Administrateur">Administrateur</option>
                            </select>
                        </div>
                    </div>
                    <div classname="col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email" value={formData.email} onChange={handleInputChange} placeholder="E-mail" />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-secondary" onClick={onHide}>Fermer</button>
                <button className="btn btn-primary" onClick={handleAjouterUtilisateur}>Ajouter</button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddUserModal;
