import React from "react";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../redux/features/auth/authSlice";

import { UserNavbar } from "./navbar/user";
import { SpecNavbar } from "./navbar/spec";
import { GuestNavbar } from "./navbar/guest";

export const Navbar = () => {

  const isAuth = useSelector(checkIsAuth);

  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {isAuth
        ? (
          user.role[0] === 'user'
            ? (<UserNavbar/> )
            : (<SpecNavbar/> )
        ) 
        : ( <GuestNavbar/> )
      }
    </>
  )
};






{/* {isAuth ? (
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
                    to={"/plants"}
                    onClick={handleNavToggle}
                    className="inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4"
                    style={location.pathname === "/plants" ? activeStyles : undefined}
                  >
                    My Plants
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
                    to={"/posts"}
                    onClick={handleNavToggle}
                    className="inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4"
                    style={location.pathname === "/posts" ? activeStyles : undefined}
                  >
                    My Posts
                  </NavLink>
                </li>

                <li className="mr-3">
                  <NavLink
                    to={"/plants/new"}
                    onClick={handleNavToggle}
                    className="inline-block text-gray-600 hover:text-gray-400 no-underline py-2 px-4"
                    style={location.pathname === "/plants/new" ? activeStyles : undefined}
                  >
                    Add Plant
                  </NavLink>
                </li>

              </ul>
            </div>
          </nav>


          <div className="relative">
            <button className="flex items-center" onClick={toggleMenu}>
              <div className="fixed top-2 -right-2 md:top-3 md:-right-1 lg:top-4 lg:right-1">
                <img
                  src={user}
                  alt=""
                  className="h-12 w-12 mx-5 object-cover rounded-full overflow-hidden"
                />
              </div>
            </button>
            <div
              className={`absolute text-left text-xs md:text-base right-0 mt-8 py-2 w-28 bg-[#151515] shadow-lg shadow-gray-500 rounded ${isOpen ? '' : 'hidden'}`}
            >
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
      ) : (          ////////////////////NavForGuest////////////////////
        showNav && (
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
      )}
    </>
  ); */}

{
  /* <div className='flex max-w-[1420px] mx-auto py-1 md:py-2 xl:py-4 px-4 gap-4 justify-between items-center'>
              <div className='left flex items-center'>
                  <a href="/"><img className='mt-1 h-12 md:h-16 xl:h-20 left-8' src={logo} alt="" /> </a>
              </div>
  
              {isAuth && (
                  <ul className='flex gap-8'>
                      <li>
                          <NavLink
                              to={'/'}
                              href='/'
                              className='text-xs text-gray-400 hover:text-white'
                              style={({ isActive }) =>
                                  isActive ? activeStyles : undefined
                              }
                          >
                              Main
                          </NavLink>
                      </li>
                      <li>
                          <NavLink
                              to={'/posts'}
                              href='/'
                              className='text-xs text-gray-400 hover:text-white'
                              style={({ isActive }) =>
                                  isActive ? activeStyles : undefined
                              }
                          >
                              My Posts
                          </NavLink>
                      </li>
                      <li>
                          <NavLink
                              to={'/new'}
                              href='/'
                              className='text-xs text-gray-400 hover:text-white'
                              style={({ isActive }) =>
                                  isActive ? activeStyles : undefined
                              }
                          >
                              Add Post
                          </NavLink>
                      </li>
                  </ul>
              )}
  
              <div>
                  {isAuth
                      ? (<button onClick={logoutHandler} className='text-xs md:text-basic xl:text-lg text-white border max-w-fit border-white font-bold hover:bg-[#292929] py-1 px-4'>Sign Out</button>)
                      : (
                          showButton && <Link to={'/login'} className='text-xs md:text-basic xl:text-lg text-white border max-w-fit border-white font-bold hover:bg-[#292929] py-1 px-4'> Sign In </Link>
                      )
                  }
  
              </div>
          </div> */
}
