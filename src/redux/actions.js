import {
    GET_FILMS, FILTER_GENRE, FILTER_TEXT, DELETE_FILM, MODIFY_FILM
} from './actionTypes'


export const getFilms = (films) => {
    return {
        type: GET_FILMS,
        payload: films
    }

}
export const filterGenre = (listGenre) => {
    return {
        type: FILTER_GENRE,
        payload: listGenre
    }

}
export const filterText = (text) => {
    return {
        type: FILTER_TEXT,
        payload: text
    }

}

export const deleteFilm = (films) => {
return {
    type: DELETE_FILM,
    payload: films
}
}
export const modifyFilm = (film) => {
        return {
            type: MODIFY_FILM,
            payload: film
        }

}