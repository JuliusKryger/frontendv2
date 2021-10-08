const URL = "https://www.test.juliusmadsen.dk/devops-starter/api/person";

function getStatus() {
    return fetch(URL + "/status")
    .then(res => handleHttpErrors(res))
}

function getPersonById(id) {
    return fetch(URL + '/' + id)
        .then(res => handleHttpErrors(res))
}

function getAllUsers(domElement) {
    fetch("https://www.test.juliusmadsen.dk/devops-starter/api/person/all")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const all = data.all
            console.log(all)
            for (let obj of all) {
                let tr = domElement.insertRow()
                tr.insertCell().textContent = obj.email
            }r
        })
}

function createPerson(person) {
    const options = makeOptions('POST', person)
    return fetch(URL, options)
        .then(res => handleHttpErrors(res))
}

function updatePerson(id, person) {
    const options = makeOptions('PUT', person)
    return fetch(URL + '/create' + id, options)
        .then(res => handleHttpErrors(res))
}

function deletePersonById(id) {
    const options = makeOptions('DELETE', { id })
    return fetch(URL + '/' + id, options)
        .then(res => handleHttpErrors(res))
}

const userFacade = {
    getStatus,
    getAllUsers,
    getPersonById,
    createPerson,
    updatePerson,
    deletePersonById
}

function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}


/* Error handling */

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default userFacade