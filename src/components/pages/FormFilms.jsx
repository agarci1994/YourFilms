import React, { useContext, useState, useEffect } from "react";
/* ---- Form ---- */
import { useFormik } from "formik";
import * as Yup from "yup";
/* ---- Redux ---- */
import { useSelector } from "react-redux";
/* ---- Firebase ---- */
import { FirebaseContext } from "../../firebase";
import FileUploader from "react-firebase-file-uploader";
/* ---- Router ---- */
import { useNavigate, useParams } from "react-router-dom";
/* ---- Components ---- */
import FormGenre from "./FormGenre";

const FormFilms = () => {
  /* ---- Params with update ---- */
  const { id } = useParams();

  const allFilms = useSelector((state) =>
    state.film.array ? state.film.array.filter((elm) => elm.id === id) : []
  );
  /* ---- State ---- */
  const [allGenre, setGenre] = useState([]);
  const [upload, setUpload] = useState(false);
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  /* ---- Navigate ---- */
  const navigate = useNavigate();
  /* ---- Firebase ---- */
  const { firebase } = useContext(FirebaseContext);

  /* ---- Get Genre Firebase ---- */
  useEffect(() => {
    getGenre();
  });
  const getGenre = () =>
    firebase.db.collection("genre").onSnapshot(handleSnapshot);

  const handleSnapshot = (snapshot) => {
    const genre = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setGenre(genre);
  };

  /* ---- Formik ---- */
  const formik = useFormik({
    initialValues: {
      title: allFilms.length ? allFilms[0].title : "",
      genre: allFilms.length ? allFilms[0].genre : [],
      synopsis: allFilms.length ? allFilms[0].synopsis : "",
      img: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      genre: Yup.string().required("Genre is quired"),
      synopsis: Yup.string()
        .min(10, "The description must be longer")
        .required("Synopsis is required"),
    }),
    onSubmit: (date) => {
      try {
        date.view = false;
        date.img = url ? url : allFilms[0].img;
        !allFilms.length
          ? firebase.db.collection("films").add(date)
          : firebase.db.collection("films").doc(id).update(date);
        navigate("/films");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleUploadStart = () => {
    setProgress(0);
    setUpload(true);
  };
  const handleUploadError = (error) => {
    setUpload(false);
  };
  const handleUploadSuccess = async (name) => {
    setProgress(100);
    setUpload(false);
    const url = await firebase.storage
      .ref("cover")
      .child(name)
      .getDownloadURL();
    setUrl(url);
  };
  const handleProgress = (progress) => {
    setProgress(progress);
  };

  return (
    <div>
      <FormGenre getGenre={getGenre} allGenre={allGenre} />
      <h1 className="text-3xl font-light mb-4 mt-10">Add your movies</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Movie Title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.title && formik.errors.title && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Error:</p>
                <p>{formik.errors.title}</p>
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Genre"
              >
                Genre:
              </label>
              <select
                id="genre"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="genre"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                multiple
              >
                {allGenre.map(({ genre, id }) => (
                  <option value={genre} key={id}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            {formik.touched.genre && formik.errors.genre && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Error:</p>
                <p>{formik.errors.genre}</p>
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="img"
              >
                Image
              </label>
              <FileUploader
                accept="image/*"
                id="img"
                name="img"
                randomizeFilename
                storageRef={firebase.storage.ref("cover")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
            </div>

            {upload && (
              <div className="h-12 relative w-full border">
                <div
                  className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                  style={{ width: `${progress}%` }}
                >
                  {progress}%
                </div>
              </div>
            )}

            {url && (
              <p className="bg-green-500 text-white p-3 text-center my-5">
                The image was uploaded successfully
              </p>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Synopsis
              </label>
              <textarea
                id="synopsis"
                placeholder="Movie Synopsis"
                className="shadow h-40 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.synopsis}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.synopsis && formik.errors.synopsis && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                role="alert"
              >
                <p className="font-bold">Error:</p>
                <p>{formik.errors.synopsis}</p>
              </div>
            )}
            <input
              type="submit"
              value="Add Film"
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormFilms;
