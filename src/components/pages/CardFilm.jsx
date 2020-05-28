import React, { useContext, useRef } from "react";
/* ---- Router ---- */
import { Link } from "react-router-dom";
/* ---- Firebase ---- */
import { FirebaseContext } from "../../firebase";

const CardFilms = ({ food: { id, title, img, genre, synopsis, view } }) => {
  /* ---- Firebase ---- */
  const { firebase } = useContext(FirebaseContext);
  /* ---- View ---- */
  const viewRef = useRef(view);
  const updateView = () => {
    const view = viewRef.current.value === "true";
    try {
      firebase.db.collection("films").doc(id).update({ view });
    } catch (error) {
      console.log(error);
    }
  };
  /* ---- Delete ---- */
  const deleteFilm = (id) =>
    firebase.db
      .collection("films")
      .doc(id)
      .delete()
      .then(() => console.log("eliminado"))
      .catch((err) => console.log(err));

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={img} alt={title} />
            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2">State:</span>
                <select
                  value={view}
                  ref={viewRef}
                  onChange={() => updateView()}
                  name="view"
                  id="view"
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="true">I have seen</option>
                  <option value="false">I have not seen</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{title}</p>
            <p className="text-gray-600 mb-4">
              Genre:
              {genre.map((elm, idx) => (
                <span key={idx} className="text-gray-700 font-bold ml-1">
                  {elm.toUpperCase()}
                </span>
              ))}
            </p>
            <p className="text-gray-600 mb-4">{synopsis}</p>
          </div>
          <div className="flex">
            <div
              className="bg-red-300 mr-3 text-white uppercase lg:h-8 lg:pl-2 lg:pr-2 lg:w-24 sm:w-1/5 sm:pl-3 hover:bg-red-600"
              onClick={() => deleteFilm(id)}
            >
              <p>Remove</p>
            </div>
            <Link
              to={`/update/${id}`}
              className="bg-green-300 text-white uppercase lg:h-8 lg:pl-2 lg:pr-2 lg:w-24 sm:w-1/5 sm:pl-3 hover:bg-green-600"
            >
              <p>Update</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFilms;
