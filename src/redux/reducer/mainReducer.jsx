import { actionTypes } from "../actions/action"

const initialData = {
    loginData: {},    
}

const mainReducer = (state = initialData, action) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN_DATA:
            return {
                ...state,
                loginData: action?.payload
            };       
        default:
            return state;
    }
}

export default mainReducer;