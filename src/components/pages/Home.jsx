import React from "react";
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Welcome!</h1>
      <Link
        to="/form-films"
        className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"
      >
        Starts now
      </Link>
    </>
  );
};

export default Home;
