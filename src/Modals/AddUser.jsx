import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addAudience } from '../services/audienceService';

const AddUserModal = ({ show, onHide, setAudiences }) => {
    const [formData, setformData] = useState({
        firstName: '',
        lastName: '',
        email: '',  // Added email to form data
        role: '',
        status: '',
        username:''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setformData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddUser = async () => {
        try {
            const userData = {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email_data: formData.email,
                role_data: formData.role,
                username_data: formData.username,
                status_data: formData.status,

            };
            const newUser = await addAudience(userData);
            if (newUser) {
                setAudiences(audiences => [...audiences, newUser]);
                onHide();  // Close the modal
                alert('User added successfully.');
            }
        } catch (error) {
            console.error('Failed to add user:', error);
            alert('Failed to add user.');
        }
    };

        useEffect(() => {
        if (!show) {
            setformData({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                role: '',
                status: ''
            });
        }
    }, [show]);

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
                            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" name="username" value={formData.username} onChange={handleInputChange} placeholder="Username" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Status Choice</label>
                            <select className="form-control" name="status" value={formData.status} onChange={handleInputChange}>
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
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Status Choice</label>
                            <select className="form-control" name="role" value={formData.role} onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="Manager">Manager</option>
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
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