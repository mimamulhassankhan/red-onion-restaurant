export const updateJSONData = (url, data) => {
    return fetch(url,{
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(returnedData => {
        return returnedData;
    })
    .catch(err => {
        return err;
    })
}

export const deleteSelectedData = (url) => {
    return fetch(url,{
        method: 'DELETE',
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res => res.json())
    .then(returnedData => {
        return returnedData;
    })
    .catch(err => {
        return err;
    })
}