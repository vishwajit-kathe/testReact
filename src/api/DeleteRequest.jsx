export const DeleteRequestcall = async (apiPath, payload) => {
    let headers = {
        "Accept": "application/json",
    }
    console.log("payload",payload)
    const getResponse = await window.axios.delete(`${process.env.REACT_APP_BASE_URL}/${apiPath}`, payload, {
        headers: headers
    }).then(function (result) {
        return result;
    }).catch((err) => console.log(err.response));
    return getResponse;
}