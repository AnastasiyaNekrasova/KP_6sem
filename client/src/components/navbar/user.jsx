import React, { useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'

import { checkIsAuth, logout } from "../../redux/features/auth/authSlice";

import logo from "../../public/images/logos/Logo9.svg";
import userPhoto from "../../public/images/usersPhoto/photo.jpg";

const activeStyles = {
  color: "white",
};

const menuItems = [
  { to: "/", label: "Catalog" },
  { to: "/plants", label: "My Plants" },
  { to: "/forum", label: "Forum" },
  { to: "/posts", label: "My Posts" },
];

export const UserNavbar = (() => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavToggle = useCallback(() => {
    setIsNavOpen(prevState => !prevState);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  const logoutHandler = useCallback(() => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You are logged out");
    navigate("/login");
  }, [dispatch, navigate]);

  return (
    <div className={`max-[1420px]:left-1/2 max-[1420px]:-ml-[710px] md:left-0 md:ml-0 m-auto bg-[#292929] flex text-center items-center justify-between fixed shadow-lg shadow-gray-500 p-2 w-full h-fit z-50 top-0 ${isAuth ? "static" : "hidden"}`}>
      <nav className="flex items-center justify-between flex-wrap w-full mr-16">
        <div className="flex flex-shrink-0 text-white mr-6">
          <a href="/">
            <img className="h-12 md:h-14 xl:h-16 left-8" src={logo} alt="" />{" "}
          </a>
        </div>

        <div className="block md:hidden">
          <button
            id="nav-toggle"
            onClick={handleNavToggle}
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div className={`w-full text-left flex-grow md:flex md:w-auto ${isNavOpen ? "" : "hidden"
          } pt-3 md:pt-0`} id="nav-content">
          <ul className="list-reset md:flex justify-end flex-1 ">
            {menuItems.map(({ to, label }) => (
              <li key={to} className="mr-3">
                <NavLink
                  to={to}
                  onClick={handleNavToggle}
                  className="inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4"
                  style={location.pathname === to ? activeStyles : undefined}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="relative">
        <button className="flex items-center" onClick={toggleMenu}>
          <div className="fixed top-2 -right-2 md:top-3 md:-right-1 lg:top-4 lg:right-1">
            <img
              src={userPhoto}
              alt=""
              className="h-12 w-12 mx-5 object-cover rounded-full overflow-hidden"
            />
          </div>
        </button>
        <div className={`absolute text-left text-xs md:text-base right-0 mt-8 py-2 w-28 bg-[#151515] shadow-lg shadow-gray-500 rounded ${isOpen ? '' : 'hidden'
          }`}>
          <button
            onClick={logoutHandler}
            className="inline-block text-gray-400 hover:text-gray-100 no-underline py-2 px-4"
          >
            Sign Out
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="inline-block text-gray-400 hover:text-gray-100 no-underline py-2 px-4"
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
});