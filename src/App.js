import React from "react";
import { Routes, Route } from "react-router";
/* --- Firebase --- */
import firebase, { FirebaseContext } from "./firebase";
/* --- Components --- */
import Home from "./components/pages/Home";
import Films from "./components/pages/Films";
import FormFilms from "./components/pages/FormFilms";
import Sidebars from "./components/UI/Sidebars";

const App = () => {
  return (
    <FirebaseContext.Provider value={{firebase}}>
      <div className="md:flex min-h-screen">
        <Sidebars />
        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/form-films" element={<FormFilms />} />
            <Route path="/update/:id" element={<FormFilms />} />
          </Routes>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
