export const actionTypes = {
    SET_LOGIN_DATA:"SET_LOGIN_DATA",
}
export const setLogindata = (payload) => {
    return {
        type: actionTypes.SET_LOGIN_DATA,
        payload: payload
    }
}
