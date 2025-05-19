import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-linear-to-r from-secondary to-primary text-primary-content px-4 shadow-sm sm:px-16">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              class="menu menu-sm dropdown-content bg-base-100 text -base-content rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Explore</a>
            </li>
            <li>
              <a>Updates</a>
            </li>
            <li>
              <a>Messages</a>
            </li>
            <li>
              <a>Network</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="">Pratik</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
