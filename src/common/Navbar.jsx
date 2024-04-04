
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import CSS for styling


const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/landing-page">Student Tracker</Link>  
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/landing-page">Home</Link> 
        </li>
        <li>
          <Link to="/assignments">Assignments</Link>
        </li>
        <li>
          <Link to="/">Login</Link>
        </li>
        </ul>
    </nav>
  );
};

export default Navbar;