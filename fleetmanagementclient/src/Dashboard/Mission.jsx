import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../Layouts/Navbar";
import Sidebar from "../Layouts/Sidebar";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import '../css/dashboard.css';
import { useState } from "react";
import AddMission from "../Modals/AddMission";

const Mission = ({ sidebarState, setSidebarState }) => {

    const [showAddModal, setShowAddModal] = useState(false);

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
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone Number</th>
                                        <th>Status</th>
                                        <th>Role</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (new Array(6)).fill(0).map((_, i) => {
                                            return <tr key={i}>
                                                <td>Text</td>
                                                <td>Text</td>
                                                <td>Text</td>
                                                <td>Text</td>
                                                <td>Text</td>
                                                <td>Text</td>
                                                <td className="d-flex gap-3 align-items-center justify-content-center">
                                                    <a href="" className="text-main text-decoration-none ">Edit</a>
                                                    <div className="divider"></div>
                                                    <a href="" className="text-main text-decoration-none ">Delete</a>
                                                </td>
                                            </tr>
                                        })
                                    }
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
