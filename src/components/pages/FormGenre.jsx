import React, { useContext } from "react";
import { useFormik } from "formik";
import { FirebaseContext } from "../../firebase";

const FormGenre = ({getGenre, allGenre}) => {


  const { firebase } = useContext(FirebaseContext);

  const formik = useFormik({
      initialValues: {
          genre: "",
        },
        onSubmit: (date) => {
            createGenre(date)
            formik.values.genre = ""
            getGenre()
        },
    });

    const createGenre = (date) => {
        const match = allGenre.filter(elm => elm.genre.toLowerCase() === date.genre.toLowerCase())
       !match.length && firebase.db.collection("genre").add(date);
    }
  return (
    <div>
      <h1 className="text-3xl font-light mb-4">Add your genre</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Genre:
              </label>
              <input
                id="genre"
                type="text"
                placeholder="Genre name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>

            <input
              type="submit"
              value="Add Genre"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormGenre;
