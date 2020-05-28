import React, { useEffect, useContext } from "react";
/* ---- Firebase---- */
import { FirebaseContext } from "../../firebase";
/* ---- Redux ---- */
import { useSelector, useDispatch } from "react-redux";
import { getFilms as get, filterGenre, filterText } from "../../redux/actions";
/* ---- Components ---- */
import CardFilm from "./CardFilm";
import SearchFilms from "./SearchFilms";

const Films = () => {
  /* ---- Redux ---- */
  const dispatch = useDispatch();
  /* ---- Firebase ---- */
  const { firebase } = useContext(FirebaseContext);
  /* ---- Get Films in Firebase---- */
  const allFilms = useSelector((state) => state.film.array);

  useEffect(() => {
    getFilms();
  }, []);

  const getFilms = () => {
    firebase.db.collection("films").onSnapshot(handleSnapshot);
  };

  const handleSnapshot = (snapshot) => {
    const films = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch(get(films));
  };

/* ---- Filter ---- */
  const searchGenre = (list) => {
    list.length && dispatch(filterGenre(list));
  };

  const searchText = (text) => {
    dispatch(filterText(text));
  };

  const resetList = () => {
    getFilms();
  };
  
  return (
    <div>
      <SearchFilms
        searchGenre={searchGenre}
        searchText={searchText}
        resetList={resetList}
      />
      <h1 className="text-3xl font-light mb-4">Films:</h1>
      {allFilms ? (
        allFilms.map((elm) => <CardFilm key={elm.id} food={elm} />)
      ) : (
        <div className="w-full overflow-hidden">
          <div className="w-1/2 inline-block relative fluentProgressBar-waiting"></div>
        </div>
      )}
    </div>
  );
};

export default Films;
