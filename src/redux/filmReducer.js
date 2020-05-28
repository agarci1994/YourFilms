import {
    GET_FILMS,
    FILTER_TEXT,
    FILTER_GENRE
} from './actionTypes'

const initialState = {}

const indexReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_FILMS:
            return {
                array: action.payload
            }
        case FILTER_GENRE:
            const arrayGenre = action.payload.map(elm => state.array.filter(films => films.genre.includes(elm)))
            return {
                array: arrayGenre[0]
            }
        case FILTER_TEXT:
            const arrayText = state.array.filter((elm) => elm.title.includes(action.payload))
            return {
                array: arrayText
            }

            default:
                return state
    }
}

export default indexReducer