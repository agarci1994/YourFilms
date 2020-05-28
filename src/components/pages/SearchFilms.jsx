import React, { useState } from "react";

const SearchFilms = ({ searchGenre, searchText, resetList }) => {
  const [drama, setDrama] = useState(false);
  const [horror, setHorror] = useState(false);
  const [comedy, setComedy] = useState(false);
  const [romantic, setRomantic] = useState(false);

  const [search, setSearch] = useState("");
  const [listSearch, setList] = useState([]);

  const handleGenre = ({ target: { textContent, id } }) => {
    if (id === "1") {
      if (!drama) {
        setDrama(!drama);
        setList([...listSearch, textContent])
        searchGenre(listSearch)
      } else {
        setList(listSearch.splice(listSearch.indexOf(textContent), 1));
        setDrama(!drama);
      }
    } else if (id === "2") {
      if (!romantic) {
        setRomantic(!romantic);
        setList([...listSearch, textContent]);
        searchGenre(listSearch);
      } else {
        setRomantic(!romantic);
        setList(listSearch.splice(listSearch.indexOf(textContent), 1));
      }
    } else if (id === "3") {
      if (!horror) {
        setHorror(!horror);
        setList([...listSearch, textContent]);
        searchGenre(listSearch);
      } else {
        setList(listSearch.splice(listSearch.indexOf(textContent), 1));
        setHorror(!horror);
      }
    } else if (id === "4") {
      if (!comedy) {
        setComedy(!comedy);
        setList([...listSearch, textContent]);
        searchGenre(listSearch);
      } else {
        setList(listSearch.splice(listSearch.indexOf(textContent), 1));
        setComedy(!comedy);
      }
    } else {
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
