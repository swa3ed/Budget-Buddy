import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import "../css/dashboard.css";
import car from "../Assets/svg/car.svg";
import semi from "../Assets/svg/semi.svg";
import suv from "../Assets/svg/suv.svg";
import truck from "../Assets/svg/truck.svg";
import { useEffect, useState, useRef } from "react";

const Vehicles = ({ sidebarState, setSidebarState }) => {
    const [vehicles, setVehicles] = useState([]);
    const editVehicle = (vehicle) => {
        // Here you would open a form modal. For simplicity, I'm using an alert.
        alert(`Edit vehicle ${vehicle.id}`);
    };
const deleteVehicle = (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from storage
    const options = {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,  // Include the token in the Authorization header
        },
    };

    fetch(`http://127.0.0.1:8000/vehicles/vehicles/${id}/`, options)
        .then(response => {
            if (response.ok) {
                // Remove the vehicle from the state to update the UI
                setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
                alert('Vehicle deleted successfully.');
            } else {
                alert('Failed to delete the vehicle.');
            }
        })
        .catch(error => console.error('Error deleting vehicle:', error));
};

    


    useEffect(() => {
        fetch('http://127.0.0.1:8000/vehicles/vehicles/') // Make sure this URL is correct
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setVehicles(data);
                } else {
                    console.error('Data is not an array:', data);
                    setVehicles([]); // set to empty array if data is not an array
                }
            })
            .catch(error => {
                console.error('Error fetching vehicles:', error);
                setVehicles([]); // Ensure vehicles is always an array
            });
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
                                                    <button onClick={() => deleteVehicle(vehicle.id)} className="btn btn-danger">Delete</button>
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
