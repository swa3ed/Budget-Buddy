import "../css/sidebar.css";
import avatar from "../Assets/temp/avatar.png";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faHandHoldingUsd, faExchangeAlt, faMoneyBillAlt, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


const Sidebar = ({ activeItem, sidebarState, setSidebarState, setIsAuthenticated, handleLogout }) => {
    const wrapperRef = useRef(null);
    const [name, setName] = useState('SALIM ');
    const [email, setEmail] = useState("def@gmail.com");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setName(decodedToken.first_name); // Assumes the token has a 'name' field
                setEmail(decodedToken.email); // Assumes the token has an 'email' field
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
                <span className="sidebar-item-label">Dashboard</span>
            </Link>
        );

        items.push(
            <Link to={'/income'} className={`sidebar-item ${activeItem === 'audience' ? 'active' : ''}`}>
                <span className="sidebar-item-icon">
                <FontAwesomeIcon icon={faHandHoldingUsd} /> 
                </span>
                <span className="sidebar-item-label">Income</span>
            </Link>
        );

        items.push(
            <Link to={'/transactions'} className={`sidebar-item ${activeItem === 'fleet' ? 'active' : ''}`}>
                <span className="sidebar-item-icon">
                <FontAwesomeIcon icon={faExchangeAlt} /> 
                </span>
                <span className="sidebar-item-label">Transactions</span>
            </Link>
        );

        items.push(
            <Link to={'/expenses'} className={`sidebar-item ${activeItem === 'form' ? 'active' : ''}`}>
                <span className="sidebar-item-icon">
                <FontAwesomeIcon icon={faMoneyBillAlt} /> 
                </span>
                <span className="sidebar-item-label">Expenses</span>
            </Link>
        );

        items.push(
            <Link to={'/subscription'} className={`sidebar-item ${activeItem === 'stats' ? 'active' : ''}`}>
                <span className="sidebar-item-icon">
                <FontAwesomeIcon icon={faReceipt} /> 
                </span>
                <span className="sidebar-item-label">Subsription</span>
            </Link>
        );

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
                    <h6 className="mb-0 text-sm">{name} </h6>
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
                  <span className="sidebar-item-label">Help</span>
                </li>
                <li className="sidebar-item" onClick={Logout} style={{ cursor: 'pointer' }}>
                  <span className="sidebar-item-icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </span>
                  <span className="sidebar-item-label" style={{ color: "#D55F5A" }}>Log out</span>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      );
    };

    export default Sidebar;