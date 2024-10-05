import { SET_SENSITIVITY } from "./audioActions";

const initialState = {
    sensitive: 1
}

const audioReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SENSITIVITY:
            return {...state, sensitive: action.payload};
        default:
            return state;
    }
}

export default audioReducer;