import React, { useState } from "react";

const SearchFilms = ({ searchGenre, searchText, resetList }) => {
  /* ---- Toggle Button ---- */
  const [drama, setDrama] = useState(false);
  const [horror, setHorror] = useState(false);
  const [comedy, setComedy] = useState(false);
  const [romantic, setRomantic] = useState(false);
  /* ---- Search Text ---- */
  const [search, setSearch] = useState("");
  /* ---- Genre Filter ---- */
  const [listSearch, setList] = useState([]);

  const handleGenre = ({ target: { textContent, id } }) => {
    /* ---- He tenido problemas con la actualización del estado por su naturaleza asincronana ---- */

    if (id === "1") {
      if (!drama) {
        setDrama(!drama);
        sendFilter(textContent);
      } else {
        setList(listSearch.splice(listSearch.indexOf(textContent), 1));
        setDrama(!drama);
      }
    } else if (id === "2") {
      if (!romantic) {
        setRomantic(!romantic);
        sendFilter(textContent);
      } else {
        setRomantic(!romantic);
        setList(listSearch.splice(listSearch.indexOf(textContent), 1));
      }
    } else if (id === "3") {
      if (!horror) {
        setHorror(!horror);
        sendFilter(textContent);
      } else {
        setList(listSearch.splice(listSearch.indexOf(textContent), 1));
        setHorror(!horror);
      }
    } else if (id === "4") {
      if (!comedy) {
        setComedy(!comedy);
        sendFilter(textContent);
      } else {
        setList(listSearch.splice(listSearch.indexOf(textContent), 1));
        setComedy(!comedy);
      }
    } else {
      /* ---- Reset ---- */
      setDrama(false);
      setComedy(false);
      setRomantic(false);
      setHorror(false);
      setList([]);
      setSearch("");
      resetList();
    }
  };

  const handleSearch = ({ target: { value } }) => {
    setSearch(value);
    searchText(search);
  };

  const sendFilter = (textContent) => {
    setList([...listSearch, textContent]);
    searchGenre(listSearch);
  };

  return (
    <div>
      <div>
        <div className="flex justify-evenly">
          <p
            id="1"
            onClick={handleGenre}
            className={
              drama
                ? "p-2 bg-blue-400 rounded-full"
                : "p-2 bg-blue-100 rounded-full"
            }
          >
            Drama
          </p>
          <p
            id="2"
            onClick={handleGenre}
            className={
              romantic
                ? "p-2 bg-blue-400 rounded-full"
                : "p-2 bg-blue-100 rounded-full"
            }
          >
            Romantic
          </p>
          <p
            id="3"
            onClick={handleGenre}
            className={
              horror
                ? "p-2 bg-blue-400 rounded-full"
                : "p-2 bg-blue-100 rounded-full"
            }
          >
            Horror
          </p>
          <p
            id="4"
            onClick={handleGenre}
            className={
              comedy
                ? "p-2 bg-blue-400 rounded-full"
                : "p-2 bg-blue-100 rounded-full"
            }
          >
            Comedy
          </p>
          <p
            id="reset"
            onClick={handleGenre}
            className="p-2 bg-green-100 rounded-full"
          >
            Reset
          </p>
        </div>
      </div>
      <div className="my-3">
        <input
          id="search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  );
};

export default SearchFilms;
