import React, { useEffect, useState } from 'react';
import { fetchVehicles, deleteVehicle } from '../services/vehicleService';
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import "../css/dashboard.css";
import car from "../Assets/svg/car.svg";
import semi from "../Assets/svg/semi.svg";
import suv from "../Assets/svg/suv.svg";
import truck from "../Assets/svg/truck.svg";



const Vehicles = ({ sidebarState, setSidebarState }) => {
    const [vehicles, setVehicles] = useState([]);

    const editVehicle = (vehicle) => {
        alert(`Edit vehicle ${vehicle.id}`);
    };

    const handleDeleteVehicle = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            const success = await deleteVehicle(id);
            if (success) {
                setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
                alert('Vehicle deleted successfully.');
            } else {
                alert('Failed to delete the vehicle.');
            }
        }
    };

    useEffect(() => {
        const loadVehicles = async () => {
            try {
                const data = await fetchVehicles();
                if (Array.isArray(data)) {
                    setVehicles(data);
                } else {
                    console.error('Data is not an array:', data);
                    setVehicles([]);
                }
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                setVehicles([]);
            }
        };
        loadVehicles();
    }, []);

    return (
        <div className="main d-flex min-vh-100 flex-nowrap">
            <Sidebar activeItem={'vehicles'} sidebarState={sidebarState} setSidebarState={setSidebarState} />
            <main className="d-flex flex-column flex-grow-1 overflow-y-scroll">
                <Navbar />
                <div className="bg-white flex-grow-1">
                <div className="px-lg-5 py-lg-3 p-2">
                        {/* States / Data */}
                        <div className="card border-0 shadow-sm mb-4 rounded-4 p-2">
                            <div className="card-body">
                                <div className="row justify-content-around flex-wrap">
                                    <div className="col-lg-3">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="p-4">
                                                <img src={car} alt="Dashboard" />
                                            </div>
                                            <div>
                                                <h6 className="text-muted">Car</h6>
                                                <h5 className="mb-0">8</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="p-4">
                                                <img src={semi} alt="Dashboard" />
                                            </div>
                                            <div>
                                                <h6 className="text-muted">Semi</h6>
                                                <h5 className="mb-0">15</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="p-4">
                                                <img src={suv} alt="Dashboard" />
                                            </div>
                                            <div>
                                                <h6 className="text-muted">SUVs</h6>
                                                <h5 className="mb-0">9</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <div className="d-flex align-items-center gap-3 flex-wrap">
                                            <div className="p-4">
                                                <img src={truck} alt="Dashboard" />
                                            </div>
                                            <div>
                                                <h6 className="text-muted">Truck</h6>
                                                <h5 className="mb-0">9</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Table */}
                        <div className="table-responsive">
                            <table className="table table-main table-hover">
                                <thead>
                                    <tr>
                                        <th>Vehicle ID</th>
                                        <th>Type</th>
                                        <th>Model</th>
                                        <th>Age</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        vehicles.map(vehicle => (
                                            <tr key={vehicle.id}>
                                                <td>{vehicle.id}</td>
                                                <td>{vehicle.Vtype_display}</td>
                                                <td>{vehicle.model}</td>
                                                <td>{vehicle.age}</td>
                                                <td>{vehicle.status}</td>
                                                <td className="d-flex gap-3 align-items-center justify-content-center">
                                                    <button onClick={() => editVehicle(vehicle)} className="btn btn-primary">Edit</button>
                                                    <button onClick={() => handleDeleteVehicle(vehicle.id)} className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Vehicles