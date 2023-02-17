import React from "react";
import { Link ,useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie';
import "./Navbar.css";
function Navbar() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const handleRemoveCookie=() =>{
    removeCookie('adminToken');
  }
  const logOut = () => {
    removeCookie('adminToken');
    //navigate('/adminLogin');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" Link to="/admin/home">
            E-Learning{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/admin/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/admin/course'>
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link "
                  to="/admin/chapter"
                >
                  Chapter
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Classes
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to='/admin/classes'>
                      Classes
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarScrollingDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Users
                </Link>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarScrollingDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to='/admin/users/request'>
                      Requested Users
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/users/approved">
                      Approved Users
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <div className="d-flex">
            <h6 className="mt-2 me-2">Admin</h6> &nbsp;&nbsp;
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button> &nbsp;
              <button className="btn btn-outline-danger mx-3"  onClick={handleRemoveCookie}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
