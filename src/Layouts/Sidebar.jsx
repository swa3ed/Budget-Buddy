import "../css/sidebar.css";
import avatar from "../Assets/temp/avatar.png";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faChartBar, faQuestionCircle,   faSignOutAlt,faUsers,faClipboardList} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faCar } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ activeItem, sidebarState, setSidebarState, setIsAuthenticated, handleLogout }) => {
    const wrapperRef = useRef(null);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [last_name, setLastName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.role); // Assumes the token has a 'role' field
                setName(decodedToken.first_name); // Assumes the token has a 'name' field
                setEmail(decodedToken.email); // Assumes the token has an 'email' field
                setLastName(decodedToken.last_name); // Assumes the token has a 'last_name' field
                console.log("Role:", decodedToken.role);
                console.log("Name:", decodedToken.name);
                console.log("Email:", decodedToken.email);
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
                <span className="sidebar-item-label">Tableau de bord</span>
            </Link>
        );

        if (role === "admin" || role === "manager") {
            items.push(
                <Link to={'/audience'} className={`sidebar-item ${activeItem === 'audience' ? 'active' : ''}`}>
                    <span className="sidebar-item-icon">
                        <FontAwesomeIcon icon={faUsers} />
                    </span>
                    <span className="sidebar-item-label">Public</span>
                </Link>
            );
        }
        if (role === "admin" || role === "fleet_manager") {
            items.push(
                <Link to={'/vehicles'} className={`sidebar-item ${activeItem === 'fleet' ? 'active' : ''}`}>
                    <span className="sidebar-item-icon">
                        <FontAwesomeIcon icon={faCar} />
                    </span>
                    <span className="sidebar-item-label">Véhicules</span>
                </Link>
            );
        }

        if (role !== "fleet_manager") {
            items.push(
                <Link to={'/mission'} className={`sidebar-item ${activeItem === 'form' ? 'active' : ''}`}>
                    <span className="sidebar-item-icon">
                        <FontAwesomeIcon icon={faClipboardList} />
                    </span>
                    <span className="sidebar-item-label">Missions</span>
                </Link>
            );
        }

        if (role !== "manager" && role !== "fleet_manager") {
            items.push(
                <Link to={'/stats'} className={`sidebar-item ${activeItem === 'stats' ? 'active' : ''}`}>
                    <span className="sidebar-item-icon">
                        <FontAwesomeIcon icon={faChartBar} />
                    </span>
                    <span className="sidebar-item-label">Statistiques</span>
                </Link>
            );
        }

        return items;
    }
    return (
        <aside className={`sidebar ${sidebarState ? 'show' : ''}`} ref={wrapperRef}>
          <div className="sidebar-content d-flex flex-column justify-content-between">
            <div>
              {/* Profil */}
              <div className="position-relative">
                <div className="d-flex align-items-center gap-3">
                  <img src={avatar} width={44} alt="Tableau de bord" />
                  <div className="fw-bold profile-content">
                    <h6 className="mb-0 text-sm">{name} {last_name}</h6>
                    <h6 className="mb-0 text-sm">{email}</h6>
                  </div>
                </div>
              </div>
              <div className="sidebar-divider"></div>
              {/* Éléments de la barre latérale */}
              <ul className="sidebar-items">
                <li className="sidebar-label">Principal</li>
                {renderMenuItems()}
              </ul>
            </div>
            {/* Pied de page de la barre latérale */}
            <div>
              <ul className="sidebar-items">
                <li className={`sidebar-item ${activeItem === 'help' ? 'active' : ''}`}>
                  <span className="sidebar-item-icon">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                  </span>
                  <span className="sidebar-item-label">Aide</span>
                </li>
                <li className="sidebar-item" onClick={Logout} style={{ cursor: 'pointer' }}>
                  <span className="sidebar-item-icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
                  <span className="sidebar-item-label" style={{ color: "#D55F5A" }}>Déconnexion du compte</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      );
    };

    export default Sidebar;
