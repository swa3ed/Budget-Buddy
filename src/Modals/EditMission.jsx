import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const EditMission = ({ show, onHide, onSave, missionToEdit }) => {
    const [mission, setMission] = useState({
        id: '',
        title: '',
        start_time: '',
        end_time: '',
        status: '',
        expected_arrival: '',
        requester_id: '',
        description: ''
    });
    const statusOptions = {
        "En cours": "1",
        "Arrivé": "2",
        "En retard": "3",
        "En attente": "4",
        "Approuvé": "5",
        "Rejeté": "6"
    };
    useEffect(() => {
        if (missionToEdit) {
            setMission(missionToEdit);
        }
    }, [missionToEdit]);
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "";
        }
        return date.toISOString().slice(0, 16); 
    };

    useEffect(() => {
        if (missionToEdit) {
            const formattedMission = {
                ...missionToEdit,
                start_time: formatDate(missionToEdit.start_time),
                end_time: formatDate(missionToEdit.end_time),
                expected_arrival: formatDate(missionToEdit.expected_arrival)
            };
            setMission(formattedMission);
        }
    }, [missionToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);  
        if (name === "status") {
            const statusValue = value;
            console.log(statusValue);  
            setMission(prevMission => ({ ...prevMission, [name]: statusValue }));
        } else {
            setMission(prevMission => ({ ...prevMission, [name]: value }));
        }
    };

    const handleSubmit = () => {
        console.log("Saving mission:", mission);
        onSave(mission);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Modifier la mission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Titre</label>
                        <input type="text" className="form-control" name="title" value={mission.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Heure de début</label>
                        <input type="datetime-local" className="form-control" name="start_time" value={mission.start_time} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Heure de fin</label>
                        <input type="datetime-local" className="form-control" name="end_time" value={mission.end_time} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Statut</label>
                        <select className="form-select border-black" name="status" value={mission.status} onChange={handleChange}>
                        <option value="">Statut</option>
                        {Object.keys(statusOptions).map(key => (
                            <option key={key} value={statusOptions[key]}>{key}</option>
                        ))}
                    </select>
                    </div>
                    <div className="form-group">
                        <label>Heure d'arrivée prévue</label>
                        <input type="datetime-local" className="form-control" name="expected_arrival" value={mission.expected_arrival} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>ID du demandeur</label>
                        <input type="text" className="form-control" name="requester_id" value={mission.requester_id} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description" value={mission.description} onChange={handleChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>Annuler</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Enregistrer les modificationss</button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditMission;
