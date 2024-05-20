import "../css/navbar.css";
import logo from "../Assets/img/blogo.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <img src={logo} className="img-fluid" width={300} alt="Dashboard" />
            </div>
        </nav>
    );
}

export default Navbar;