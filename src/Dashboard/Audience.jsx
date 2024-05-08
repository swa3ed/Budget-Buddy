import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../css/dashboard.css";
import AddUserModal from "../Modals/AddUser";
import { fetchAudiences, deleteAudience, updateUser } from "../services/audienceService";

const Audience = ({ sidebarState, setSidebarState }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [audiences, setAudiences] = useState([]);
  const [editAudienceId, setEditAudienceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [editFormData, setEditFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    role_data: "",
    phone_number: "",
    email_data: "",
    status_data: '',
    username_data: ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredAudiences = audiences.filter(user => {
    const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
    return fullName.includes(searchTerm);
  });

  const handleEditClick = (user) => {
    setEditAudienceId(user.id);
    setEditFormData(user);
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = await updateUser(editFormData.id, editFormData);
      if (updatedData) {
        const updatedAudiences = audiences.map((user) =>
          user.id === updatedData.id ? updatedData : user
        );
        setAudiences(updatedAudiences);
        setEditAudienceId(null);
      } else {
        alert("Failed to update the user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Update failed.");
    }
  };

  const handleDeleteAudience = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const success = await deleteAudience(id);

      if (success) {
        setAudiences((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert("User deleted successfully.");
      } else {
        alert("Failed to delete the user.");
      }
    }
  };

  useEffect(() => {
    const loadAudiences = async () => {
      try {
        const data = await fetchAudiences();
        if (Array.isArray(data)) {
          setAudiences(data);
        } else {
          console.error("Data is not an array:", data);
          setAudiences([]);
        }
      } catch (error) {
        console.error("Error fetching audiences:", error);
        setAudiences([]);
      }
    };
    loadAudiences();
  }, []);

  return (
    <div className="main d-flex min-vh-100 flex-nowrap">
      <Sidebar
        activeItem={"audiences"}
        sidebarState={sidebarState}
        setSidebarState={setSidebarState}
      />
      <main className="d-flex min-vh-100 flex-column flex-grow-1 overflow-y-scroll">
        <Navbar />
        <div className="content bg-white flex-grow-1">
          <div className="px-lg-5 py-lg-3 p-2">
            {/* Search & Filters */}
            <div className="row g-0">
              <div className="col-md-7">
                <input
                  type="text"
                  className="form-control bg-light px-4 fw-semibold rounded-end-0"
                  name="search"
                  id="search-input"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="col-md-2">
                <select
                  className="form-select px-4 bg-light fw-semibold rounded-start-0 rounded-end-0"
                  name="roles"
                  id="role-select"
                >
                  <option selected>Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <div className="col-md-auto col-sm-1">
                <button className="btn rounded-start-0 btn-main w-100">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-main table-hover w-100 word-wrp">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAudiences.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      {editAudienceId === user.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              name="first_name"
                              value={editFormData.first_name}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="last_name"
                              value={editFormData.last_name}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="email_data"
                              value={editFormData.email_data}
                              onChange={handleInputChange}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="role_data"
                              value={editFormData.role_data}
                              onChange={handleInputChange}
                            />
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{user.first_name}</td>
                          <td>{user.last_name}</td>
                          <td>{user.email_data}</td>
                          <td>{user.role_data}</td>
                        </>
                      )}
                      <td className="d-flex gap-3 align-items-center justify-content-center">
                        <button
                          onClick={handleSaveClick}
                          className="btn btn-success"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => handleEditClick(user)}
                          className="btn btn-primary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAudience(user.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-main px-3 py-2 mt-3"
              onClick={() => setShowAddModal(true)}
            >
              New User
            </button>
          </div>
        </div>
      </main>
      <AddUserModal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}
        setAudiences={setAudiences}
      />
    </div>
  );
};

export default Audience;
