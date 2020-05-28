import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { getFilms as get, filterGenre, filterText } from "../../redux/actions";
import CardFilm from "./CardFilm";
import SearchFilms from "./SearchFilms";

const Films = () => {
  const { firebase } = useContext(FirebaseContext);

  const allFilms = useSelector((state) => state.film.array);
  const dispatch = useDispatch();

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
        <div class="w-full overflow-hidden">
          <div class="w-1/2 inline-block relative fluentProgressBar-waiting"></div>
        </div>
      )}
    </div>
  );
};

export default Films;
