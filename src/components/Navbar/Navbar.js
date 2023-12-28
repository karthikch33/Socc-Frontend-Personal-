import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleLogOut = ()=>{
    handleClick()
    localStorage.removeItem('adminData')
    localStorage.removeItem('server')
    localStorage.removeItem('email')
  }


  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Admin(S)</span>
            <span className="icon">
              {/* <CodeIcon /> */}
            </span>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/home"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
              Home
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink
                exact
                to="/sessions"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Sessions
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                exact
                to="/attendance"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Attendance
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Complaints
              </NavLink>
            </li>
           {localStorage.getItem('adminData') ? <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleLogOut}
              >
               LogOut
              </NavLink>
            </li>:
            <li className="nav-item">
            <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
               Login
              </NavLink></li>}
              <li className="nav-item">
              <NavLink
                to="/profile"
                activeClassName="active"
                onClick={handleClick}
              >
                <img src="http://res.cloudinary.com/dpkdi73b4/image/upload/v1701939540/uo6fzhhmmlwicq6dnsma.jpg" alt="" className="img-fluid" width={50} height={50} style={{borderRadius:"50%"}}/>
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            ) : (
                <span className="icon">
                  <HamburgetMenuOpen />{" "}
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;