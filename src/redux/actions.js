import {
    GET_FILMS, FILTER_GENRE, FILTER_TEXT
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
