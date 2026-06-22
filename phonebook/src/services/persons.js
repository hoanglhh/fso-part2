import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
    .then(response => response.data)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
    .then(response => response.data)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, Person) => {
    return axios.put(`${baseUrl}/${id}`, Person)
    .then(response => response.data)
}

export default {getAll, create, remove, update}