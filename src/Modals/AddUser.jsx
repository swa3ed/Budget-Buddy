import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addAudience } from '../services/audienceService';

const AddUserModal = ({ show, onHide, setAudiences }) => {
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        status: '',
        role: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddUser = async () => {
        try {
            const userData = {
                ...formValues,
                // Assume your backend expects a username field, adjust as needed
                username: formValues.firstName + formValues.lastName,
                email: formValues.email, // Make sure to add an email input or handle it appropriately
            };
            const newUser = await addAudience(userData);
            setAudiences(audiences => [...audiences, newUser]);
            onHide(); // Close the modal
        } catch (error) {
            console.error('Failed to add user:', error);
            alert('Failed to add user.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} dialogClassName='showDialog' centered={true} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" name="firstName" value={formValues.firstName} onChange={handleInputChange} placeholder="First Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={formValues.lastName} onChange={handleInputChange} placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" name="phone" value={formValues.phone} onChange={handleInputChange} placeholder="Phone" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Status Choice</label>
                            <select className="form-control" name="status" value={formValues.status} onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="On Going">On Going</option>
                                <option value="Arrived">Arrived</option>
                                <option value="OverDue">OverDue</option>
                                <option value="Pending">Pending</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Role</label>
                            <input type="text" className="form-control" name="role" value={formValues.role} onChange={handleInputChange} placeholder="Role" />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-secondary" onClick={onHide}>Close</button>
                <button className="btn btn-primary" onClick={handleAddUser}>Add</button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddUserModal;
