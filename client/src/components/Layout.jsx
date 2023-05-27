import React from "react";
import { Navbar } from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
        <Navbar />
      <div className="container mx-0 min-w-full h-screen reltive">
        {children}
      </div>
    </React.Fragment>
  );
};
