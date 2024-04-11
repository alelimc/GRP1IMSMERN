import { API_SERVER } from "./const"

const signin = async (user) => {
    try {
        let response = await fetch(`${API_SERVER}auth/signin`, {
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
const signout = async () => {
    try {
        let response = await fetch(`${API_SERVER}api/users`, { method: 'GET' })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}
export { signin, signout }