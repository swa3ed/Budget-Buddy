import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import AddMission from "../Modals/AddMission";
import EditMission from '../Modals/EditMission';
import { fetchMission, deleteMission, updateMission, addMission } from "../services/missionService";
import '../css/dashboard.css';

const Mission = ({ sidebarState, setSidebarState }) => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [missions, setMissions] = useState([]);
    const [currentMission, setCurrentMission] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const loadMissions = async () => {
            try {
                const data = await fetchMission();
                setMissions(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching missions:", error);
            }
        };
        loadMissions();
    }, []);
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' };
        const date = new Date(dateString);
        return date.toLocaleString('fr-FR', options);  
    }
    
    const statusOptions = {
        "En cours": "1",
        "Arrivé": "2",
        "En retard": "3",
        "En attente": "4",
        "Approuvé": "5",
        "Rejeté": "6"
    };
    
    const numberToStatus = Object.entries(statusOptions).reduce((acc, [key, value]) => {
        acc[value] = key;
        return acc;
    }, {});
    const handleAddMission = () => {
        setCurrentMission({
            title: "",
            start_time: "",
            end_time: "",
            status: "",
            expected_arrival: "",
            request_time: "",
            description: "",
            requester_id: "",
        });
        setShowAddModal(true);
    };
    

    const handleEditClick = (mission) => {
        setCurrentMission(mission);
        setShowEditModal(true);
      };

    const handleMissionSave = async (missionData) => {
      try {
        if (missionData.id) {
            console.log("Updating mission:", missionData);
            const updatedData = await updateMission(missionData.id,missionData);
            setMissions(missions.map(m => m.id === missionData.id ? updatedData : m));
        } else {
            console.log("Adding new mission:", missionData);
            const newData = await addMission(missionData);
            setMissions([...missions, newData]);
        }
        setShowAddModal(false);
      } catch (error) {
          console.error("Error adding mission:", error);
          alert("Failed to add mission.");
      }
  };

    const handleDeleteMission = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette mission ?")) {
            try {
                console.log("Deleting mission with ID:", id);
                const success =await deleteMission(id);
                if (!success) {
                    throw new Error("Failed to delete the mission.");
                }
                else{
                    console.log("Deleted mission with ID:", id);
                    setMissions(missions.filter(m => m.id !== id));
                }
                alert("Êtes-vous sûr de vouloir supprimer cette mission ?");
            } catch (error) {
                console.error("Error deleting mission:", error);
                alert("Échec de la suppression de la mission.");
            }
        }
    };

    return (
        <div className="main d-flex min-vh-100 flex-nowrap">
            <Sidebar activeItem={'form'} sidebarState={sidebarState} setSidebarState={setSidebarState} />
            <main className="d-flex min-vh-100 flex-column flex-grow-1 overflow-y-scroll">
                <Navbar />
                <div className="content bg-white flex-grow-1">
                    <div className="px-lg-5 py-lg-3 p-2 h-100">
                        <div className="row g-0 mb-3">
                            <div className="col-md-auto col-sm-1">
                                <button className="btn rounded-start-0 btn-main w-100">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                        <div className="table-responsive mt-5">
                            <table className="table table-main table-hover w-100 word-wrp">
                                <thead>
                                    <tr>
                                        <th>Mission</th>
                                        <th>Heure de début</th>
                                        <th>Heure de fin</th>
                                        <th>Description</th>
                                        <th>Demandeur</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {missions.map((mission) => (
                                        <tr key={mission.id}>
                                            <td>{mission.title}</td>
                                            <td>{formatDate(mission.start_time)}</td>
                                            <td>{formatDate(mission.end_time)}</td>
                                            <td>{mission.description}</td>
                                            <td>{mission.requester_id}</td>
                                            <td>{numberToStatus[mission.status]}</td>
                                            <td className="d-flex gap-3 align-items-center justify-content-center">
                                                <button onClick={() => handleEditClick(mission)} className="btn btn-primary">Modifier</button>
                                                <button onClick={() => handleDeleteMission(mission.id)} className="btn btn-danger">Supprimer</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button className="btn btn-success px-3 py-2 mt-3" onClick={handleAddMission}>Nouvelle Mission</button>
                    </div>
                </div>
            </main>
            {showAddModal && (
                <AddMission
                    show={showAddModal}
                    onHide={() => setShowAddModal(false)}
                    onSave={handleMissionSave}
                />
            )}
            {showEditModal && (
                <EditMission
                    show={showEditModal}
                    onHide={() => setShowEditModal(false)}
                    onSave={handleMissionSave}
                    missionToEdit={currentMission}
                />
            )}
        </div>
    );
};

export default Mission;

