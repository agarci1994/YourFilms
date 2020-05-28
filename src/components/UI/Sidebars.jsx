import React from "react";
/* ---- Router ---- */
import { NavLink } from "react-router-dom";

const Sidebars = () => {
  return (
    <div className="md:w-2/5 xl:w-1/5 bg-gray-600">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          YourFilms
        </p>
        <p className="mt-3 text-gray-600">
          Organize your movies by genre.
        </p>
        <nav>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-gray-500 hover:text-gray-900"
            activeClassName='bg-gray-500 text-gray-900'
            to="/films"
          >
            List of movies
          </NavLink>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-gray-500 hover:text-gray-900"
            activeClassName='bg-gray-500 text-gray-900'
            to="/form-films"
          >
            Form
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebars;
