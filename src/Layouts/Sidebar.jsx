import "../css/sidebar.css";
import avatar from "../Assets/temp/avatar.png";
import { Link } from "react-router-dom";
import { useSidebarOutsideAlerter } from "../Hooks/OutsideHook";
import { useRef, useState, useEffect } from "react";
import {jwtDecode} from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faCar } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ activeItem, sidebarState, setSidebarState, setIsAuthenticated, handleLogout }) => {
    const wrapperRef = useRef(null);
    const [role, setRole] = useState("");
    useSidebarOutsideAlerter(wrapperRef, setSidebarState);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.role); // Assumes the token has a 'role' field
                console.log("Role:", decodedToken.role);
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        }
    }, []);

    const Logout = () => {
        localStorage.removeItem('userToken');
        if (typeof setIsAuthenticated === 'function') {
            setIsAuthenticated(false);
        } else {
            console.error("setIsAuthenticated is not a function");
        }
        navigate('/login');
    }

    const renderMenuItems = () => {
        const items = [];

        items.push(
            <Link to={'/'} className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`}>
                <span className="sidebar-item-icon">
                    <FontAwesomeIcon icon={faHome} />
                </span>
                <span className="sidebar-item-label">Dashboard</span>
            </Link>
        );

        if (role === "admin" || role === "manager") {
            items.push(
                <Link to={'/audience'} className={`sidebar-item ${activeItem === 'audience' ? 'active' : ''}`}>
                    <span className="sidebar-item-icon">
                        <FontAwesomeIcon icon={faHome} />
                    </span>
                    <span className="sidebar-item-label">Audience</span>
                </Link>
            );
        }
        if (role === "admin" || role === "fleet_manager") {
            items.push(
                <Link to={'/vehicles'} className={`sidebar-item ${activeItem === 'fleet' ? 'active' : ''}`}>
                    <span className="sidebar-item-icon">
                        <FontAwesomeIcon icon={faCar} />
                    </span>
                    <span className="sidebar-item-label">Vehicles</span>
                </Link>
            );
        }

        if (role !== "fleet_manager") {
            items.push(
                <Link to={'/form'} className={`sidebar-item ${activeItem === 'form' ? 'active' : ''}`}>
                    <span className="sidebar-item-icon">
                        <FontAwesomeIcon icon={faHome} />
                    </span>
                    <span className="sidebar-item-label">Form</span>
                </Link>
            );
        }

        if (role !== "manager" && role !== "fleet_manager") {
            items.push(
                <Link to={'/stats'} className={`sidebar-item ${activeItem === 'stats' ? 'active' : ''}`}>
                    <span className="sidebar-item-icon">
                        <FontAwesomeIcon icon={faChartBar} />
                    </span>
                    <span className="sidebar-item-label">Statistics</span>
                </Link>
            );
        }

        return items;
    }

    return (
        <aside className={`sidebar ${sidebarState ? 'show' : ''}`} ref={wrapperRef}>
            <div className="sidebar-content d-flex flex-column justify-content-between ">
                <div>
                    {/* Profile */}
                    <div className="position-relative">
                        <div className="d-flex align-items-center gap-3">
                            <img src={avatar} width={44} alt="Dashboard" />
                            <div className="fw-bold profile-content">
                                <h6 className="mb-0 text-sm">Admin Name</h6>
                                <h6 class="mb-0 text-sm">Admin@example.com</h6>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-divider"></div>
                    {/* Sidebar Items */}
                    <ul className="sidebar-items">
                        <li className="sidebar-label">Main</li>
                        {renderMenuItems()}
                    </ul>
                </div>
                {/* Sidebar Footer */}
                <div>
                    <ul className="sidebar-items">
                        <li className={`sidebar-item ${activeItem === 'help' ? 'active' : ''}`}>
                            <span className="sidebar-item-icon">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                            </span>
                            <span className="sidebar-item-label">Help</span>
                        </li>
                        <li className="sidebar-item" onClick={Logout} style={{ cursor: 'pointer' }}>
                            <span className="sidebar-item-icon">
                                <FontAwesomeIcon icon={faHome} />
                            </span>
                            <span className="sidebar-item-label" style={{ color: "#D55F5A" }}>Logout Account</span>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
