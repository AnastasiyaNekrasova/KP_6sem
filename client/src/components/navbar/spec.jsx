import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify'
import axios from "axios";

import { checkIsAuth, logout } from "../../redux/features/auth/authSlice";
import { addPhotoToUser } from "../../utils/userModification";
import { setAvatarRoute } from "../../utils/APIRoutes";

import logo from "../../public/images/logos/Logo9.svg";
import spec from "../../public/images/usersPhoto/puffer-fish.png";
import avatar1 from "../../public/images/usersPhoto/chicken.png";
import avatar2 from "../../public/images/usersPhoto/deer.png";
import avatar3 from "../../public/images/usersPhoto/dog.png";
import avatar4 from "../../public/images/usersPhoto/panda.png";
import avatar5 from "../../public/images/usersPhoto/walrus.png";

export const SpecNavbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth)

  const activeStyles = {
    color: "white",
  };

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(user.avatarImage);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You are logged out");
    navigate("/login");
  };

  const avatarOptions = [spec, avatar1, avatar2, avatar3, avatar4, avatar5];

  async function getImageData(imagePath) {
    const response = await fetch(imagePath);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  useEffect(() => {
    if (user.avatarImage === '') {
      handleAvatarClick(spec);
    }
  }, [user.avatarImage]);

  const handleAvatarClick = async (avatar) => {
    setSelectedImage(avatar);
    try {
      getImageData(avatar)
        .then(async (imageData) => {
          const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
            image: imageData,
          });
        })
    } catch (error) {
      console.error('Error selecting avatar', error);
    }
  };

  return (
    <div className={`max-[1420px]:left-1/2 max-[1420px]:-ml-[710px] md:left-0 md:ml-0 m-auto bg-[#292929] flex text-center items-center justify-between fixed shadow-lg shadow-gray-500 p-2 w-full h-fit z-50 top-0 ${isAuth ? "static" : "hidden"
      }`}>
      <nav className="flex items-center justify-between flex-wrap w-full mr-16">
        <div className="flex flex-shrink-0 text-white mr-6">
          <a href="/">
            <img
              className="h-12 md:h-14 xl:h-16 left-8"
              src={logo}
              alt=""
            />{" "}
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

        <div
          className={`w-full text-left flex-grow md:flex md:w-auto ${isNavOpen ? "" : "hidden"
            } pt-3 md:pt-0`}
          id="nav-content"
        >
          <ul className="list-reset md:flex justify-end flex-1 ">

            <li className="mr-3">
              <NavLink
                to={"/"}
                onClick={handleNavToggle}
                className="inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4"
                style={location.pathname === "/" ? activeStyles : undefined}
              >
                Catalog
              </NavLink>
            </li>

            <li className="mr-3">
              <NavLink
                to={"/forum"}
                onClick={handleNavToggle}
                className="inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4"
                style={location.pathname === "/forum" ? activeStyles : undefined}
              >
                Forum
              </NavLink>
            </li>

            <li className="mr-3">
              <NavLink
                to={"/chat"}
                onClick={handleNavToggle}
                className="inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4"
                style={location.pathname === "/chat" ? activeStyles : undefined}
              >
                Chat
              </NavLink>
            </li>

            <li className="mr-3 inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4 cursor-pointer" onClick={logoutHandler}>
              Sign Out
            </li>

          </ul>
        </div>
      </nav>

      <div className="relative">
        <button className="flex items-center" onClick={toggleMenu}>
          <div className="fixed top-2 -right-2 md:top-3 md:-right-1 lg:top-4 lg:right-1">
            <img
              src={selectedImage}
              alt=""
              className="h-12 w-12 mx-5 object-cover rounded-full overflow-hidden"
            />
          </div>
        </button>
        <div
          className={`absolute right-0 mt-8 py-2 bg-[#151515] shadow-lg shadow-gray-500 rounded transform transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
        >
          <div className="flex justify-center">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar}
                onClick={() => handleAvatarClick(avatar)}
                className="inline-flex items-center justify-center rounded-full w-14 h-14 m-2 focus:outline-none"
              >
                <img
                  src={avatar}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};