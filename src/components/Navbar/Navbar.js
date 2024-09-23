import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import cookies from "../cookies";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleLogOut = ()=>{
    handleClick()
    console.log('hi');
    localStorage.clear()
    cookies.remove('adminData')
    window.location.reload()
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
           {cookies.get('adminData') ? <li className="nav-item">
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