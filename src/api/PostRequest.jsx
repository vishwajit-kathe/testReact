export const Postrequestcall = async (apiPath, payload, contentType) => {
    let headers = {
        "Accept": "application/json",
    }
    if (contentType) {
        headers['Content-Type'] = 'multipart/form-data'
    }
    const getResponse = await window.axios.post(`${process.env.REACT_APP_BASE_URL}/${apiPath}`, payload, {
        headers: headers
    }).then(function (result) {
        return result;
    }).catch((err) => err.response);
    return getResponse;
}