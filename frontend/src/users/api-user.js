import { API_SERVER } from "../lib/const"
import auth from '../lib/auth-helper'


const create = async (user) => {
    try {
        let response = await fetch(`${API_SERVER}api/users/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listId = async (params, credentials) => {
    try {
      const user = auth.isAuthenticated();
      let response = await fetch(`${API_SERVER}api/users/` + params.userId, {
        method: "GET",
        headers: {
          'Accept': "application/json",
          'Content-Type': "application/json",
          'Authorization': "Bearer " + credentials.t,
        },
      });
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  };

const list = async (user) => {
    try {
        const user = auth.isAuthenticated();
        let response = await fetch(`${API_SERVER}api/users/`, {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params, signal) => {
    const user = auth.isAuthenticated();
    try {
        
        let response = await fetch(`${API_SERVER}api/users/` + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const update = async (params) => {
    const user = auth.isAuthenticated();
    try {
        
        let response = await fetch(`${API_SERVER}api/users/` + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(params)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
const remove = async (params) => {
    try {
        const user = auth.isAuthenticated();
        let response = await fetch(`${API_SERVER}api/users/` + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { create, list, read, update, remove , listId}