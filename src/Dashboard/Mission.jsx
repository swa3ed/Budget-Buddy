import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import '../css/dashboard.css';
import AddMission from "../Modals/AddMission";
import { fetchMission, deleteMission,updateMission,addMission } from "../services/missionService";

const Mission = ({ sidebarState, setSidebarState }) => {

    const [showAddModal, setShowAddModal] = useState(false);
    const [Missions, setMissions] = useState([]);
    const [editMissionId, setEditMissionId] = useState(null);
    const [editFormData, setEditFormData] = useState({
    
            title: "",
            start_time: "",
            end_time: "",
            status: "",
            expected_arrival: "",
            request_time: "",
            description: "",
            requester_id: "",
        
    });
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setEditFormData({
        ...editFormData,
        [name]: value,
      });
    };
  
    const handleEditClick = (Mission) => {
      setEditMissionId(Mission.id);
      setEditFormData(Mission);
    };
  
    const handleSaveClick = async () => {
      try {
        console.log("Updating vehicle with data:", editFormData); // Log the data being sent
        const updatedData = await updateMission(editFormData.id, editFormData);
        if (updatedData) {
          const updatedMissions = Mission.map((Mission) =>
          Mission.id === updatedData.id ? updatedData : Mission
          );
          setMissions(updatedMissions);
          setEditMissionId(null);
        } else {
          alert("Failed to update the mission.");
        }
      } catch (error) {
        console.error("Error updating Mission:", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
        }
        alert("Update Successfully");
      }
    };
  
  
    const handleDeleteMission = async (id) => {
      if (window.confirm("Are you sure you want to delete this mission?")) {
        const success = await deleteMission(id);
  
        if (success) {
          setMissions((prevMissions) =>
            prevMissions.filter((Mission) => Mission.id !== id)
          );
          alert("Vehicle deleted successfully.");
        } else {
          alert("Failed to delete the vehicle.");
        }
      }
    };
  
    useEffect(() => {
      const loadMission = async () => {
        try {
          const data = await fetchMission();
          if (Array.isArray(data)) {
            setMissions(data);
          } else {
            console.error("Data is not an array:", data);
            setMissions([]);
          }
        } catch (error) {
          console.error("Error fetching Mission:", error);
          setMissions([]);
        }
      };
      loadMission();
    }, []);

    return (
        <div className="main d-flex min-vh-100 flex-nowrap">
            <Sidebar activeItem={'form'} sidebarState={sidebarState} setSidebarState={setSidebarState}/>
            <main className="d-flex min-vh-100 flex-column flex-grow-1 overflow-y-scroll">
                <Navbar />
                <div className="content bg-white flex-grow-1">
                    <div className="px-lg-5 py-lg-3 p-2 h-100">
                        {/* Search & Filters */}
                        <div className="row g-0 mb-3">
                            <div className="col-md-7">
                                <input type="text" class="form-control bg-light px-4 fw-semibold rounded-end-0" name="search" id="search-input"  placeholder="Search" />
                            </div>
                            <div className="col-md-2">
                                <select  class="form-select px-4 bg-light fw-semibold rounded-start-0 rounded-end-0" name="roles" id="role-select">
                                    <option selected>Role</option>
                                    <option value="">Admin</option>
                                    <option value="">User</option>
                                    <option value="">Manager</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <select  class="form-select px-4 bg-light fw-semibold rounded-start-0 rounded-end-0" name="status" id="status-select">
                                    <option selected>Status</option>
                                    <option value="On Going">On Going</option>
                                    <option value="Arrived">Arrived</option>
                                    <option value="OverDue">OverDue</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Approved">Approved</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="col-md-auto col-sm-1">
                                <button className="btn rounded-start-0 btn-main w-100">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                        {/* Table */}
                        <div className="table-responsive mt-5">
                            <table className="table table-main table-hover w-100 word-wrp">
                                <thead>
                                    <tr>
                                        <th>Mission</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Description</th>
                                        <th>Requester</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Missions.map((mission) => (
                                        <tr key={mission.id}>
                                        {editMissionId === mission.id ? (
                                            <>
                                            <td>
                                                <input
                                                type="text"
                                                name="title"
                                                value={editFormData.title}
                                                onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                type="text"
                                                name="start_time"
                                                value={editFormData.start_time}
                                                onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                type="text"
                                                name="end_time"
                                                value={editFormData.end_time}
                                                onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                type="text"
                                                name="description"
                                                value={editFormData.description}
                                                onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                type="text"
                                                name="requester_id"
                                                value={editFormData.requester_id}
                                                onChange={handleInputChange}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                type="text"
                                                name="status"
                                                value={editFormData.status}
                                                onChange={handleInputChange}
                                                />
                                            </td>
                                            </>
                                        ) : (
                                            <>
                                            <td>{mission.title}</td>
                                            <td>{mission.start_time}</td>
                                            <td>{mission.end_time}</td>
                                            <td>{mission.description}</td>
                                            <td>{mission.requester_id}</td>
                                            <td>{mission.status}</td>
                                            </>
                                        )}
                                        <td className="d-flex gap-3 align-items-center justify-content-center">
                                            {editMissionId === mission.id ? (
                                            <button onClick={handleSaveClick} className="btn btn-success">Save</button>
                                            ) : (
                                            <>
                                                <button
                                                onClick={() => handleEditClick(mission)}
                                                className="btn btn-primary"
                                                >
                                                Edit
                                                </button>
                                                <button
                                                onClick={() => handleDeleteMission(mission.id)}
                                                className="btn btn-danger"
                                                >
                                                Delete
                                                </button>
                                            </>
                                            )}
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                            </table>
                        </div>
                        <button className="btn btn-main px-3 py-2 mt-3" onClick={() => setShowAddModal(true)}>New Mission</button>
                    </div>
                </div>
            </main>
            <AddMission show={showAddModal} onHide={() => setShowAddModal(false)} hide={() => setShowAddModal(false)}/>
        </div>
    );
}

export default Mission
