import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


const AddMission = ({ show, onHide, onSave }) => {
    const [mission, setMission] = useState({
        title: '',
        start_time: '',
        end_time: '',
        status: '4',
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
        onSave(mission);
        onHide();  // Close the modal after saving
    };
    return (
        <Modal show={show} onHide={onHide} dialogClassName='showDialog' centered={true} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Créer une nouvelle mission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    <textarea className="form-control" name="description" rows="3" value={mission.description} onChange={handleChange}></textarea>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>Annuler</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Créer</button>
            </Modal.Footer>
    </Modal>
    );
}

export default AddMission;
