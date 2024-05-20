import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

const Edittrack = ({ show, onHide, onSave, trackToEdit }) => {
    const [track, settrack] = useState({
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
        "Pending": "1",
        "Done": "2",
        "Late": "3",
        "Waiting": "4",
        "Approved": "5",
        "Rejected": "6"
    };
    useEffect(() => {
        if (trackToEdit) {
            settrack(trackToEdit);
        }
    }, [trackToEdit]);
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "";
        }
        return date.toISOString().slice(0, 16); 
    };

    useEffect(() => {
        if (trackToEdit) {
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
            settrack(prevtrack => ({ ...prevtrack, [name]: statusValue }));
        } else {
            settrack(prevtrack => ({ ...prevtrack, [name]: value }));
        }
    };

    const handleSubmit = () => {
        console.log("Saving :", track);
        onSave(track);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Modify</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title" value={mission.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Start</label>
                        <input type="datetime-local" className="form-control" name="start_time" value={mission.start_time} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>End</label>
                        <input type="datetime-local" className="form-control" name="end_time" value={mission.end_time} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Status</label>
                        <select className="form-select border-black" name="status" value={mission.status} onChange={handleChange}>
                        <option value="">Status</option>
                        {Object.keys(statusOptions).map(key => (
                            <option key={key} value={statusOptions[key]}>{key}</option>
                        ))}
                    </select>
                    </div>
                    <div className="form-group">
                        <label>Time taken</label>
                        <input type="datetime-local" className="form-control" name="expected_arrival" value={mission.expected_arrival} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>ID </label>
                        <input type="text" className="form-control" name="requester_id" value={mission.requester_id} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description" value={mission.description} onChange={handleChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={onHide}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
            </Modal.Footer>
        </Modal>
    );
};

export default Edittrack;
