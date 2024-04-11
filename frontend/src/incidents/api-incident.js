import { API_SERVER } from "../lib/const"
import auth from '../lib/auth-helper'

const create = async (incident) => {
    try {
        const token = auth.getToken();
        let response = await fetch(`${API_SERVER}api/incidents/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(incident)
        })
        return response.json()
    } catch (err) {
        console.log(err)
        return err
    }
}

const list = async ( user) => {
    try {
        let response = await fetch(`${API_SERVER}api/admin/incidents/`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.t
            }
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const listByUser = async (user) => {
    try {
        let response = await fetch(`${API_SERVER}api/incidents/byUser/${user.userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + user.t
            }
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, signal) => {
    try {
        const user = auth.isAuthenticated();
        let response = await fetch(`${API_SERVER}api/incidents/` + params.incidentId, {
            method: 'GET',
            signal: signal,
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params) => {
    
    const user = auth.isAuthenticated();
    try {
        let response = await fetch(`${API_SERVER}api/incidents/${params.incidentId}/${user.user._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(params)
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

const remove = async (params) => {
    try {
        const user = auth.isAuthenticated();
        let response = await fetch(`${API_SERVER}api/incidents/${params.incidentId}/${user.user._id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

export { create, list, listByUser, read, update, remove }
