import React from "react";
import { Link } from "react-router-dom";

import logo from "../../public/images/logos/Logo9.svg";
import guest from "../../public/images/usersPhoto/free-icon-avatar-805390.png";

export const GuestNavbar = () => {

    return(
            <div className={`{max-[1420px]:left-1/2 max-[1420px]:-ml-[710px] md:left-0 md:ml-0 m-auto bg-[#292929] flex items-center justify-between fixed shadow-lg shadow-gray-500 p-2 w-full z-10 top-0`}>
              <nav className="flex items-center justify-between flex-wrap w-full">
                <div className="flex items-center flex-shrink-0 text-white mr-6">
                  <a href="/">
                    <img
                      className="mt-1 h-12 md:h-14 xl:h-16 left-8"
                      src={logo}
                      alt=""
                    />{" "}
                  </a>
                </div>
  
                <div>
                  <button className="inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4">
                    {" "}
                    <Link to="/login">Sign In</Link>
                  </button>
                </div>
              </nav>
              <div className="">
                <img
                  src={guest}
                  alt=""
                  className="h-12 w-12 mx-5 object-cover rounded-full overflow-hidden"
                />
              </div>
            </div>
    )
}