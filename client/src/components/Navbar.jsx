import React from "react";
import { useSelector } from "react-redux";
import { checkIsAuth } from "../redux/features/auth/authSlice";
import { useLocation } from "react-router-dom";

import { UserNavbar } from "./navbar/user";
import { SpecNavbar } from "./navbar/spec";
import { GuestNavbar } from "./navbar/guest";

export const Navbar = () => {

  const isAuth = useSelector(checkIsAuth);
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const showNav = !["/login", "/register", "/setAvatar"].includes(location.pathname);

  return (
    showNav && (
      isAuth ? (
        user.role[0] === 'user' ? <UserNavbar /> : <SpecNavbar />
      ) : <GuestNavbar />
    )
  );
}