import { signout } from './api-auth.js'
const auth = {
    isAuthenticated() {
        if (typeof window == "undefined")
            return false
        if (localStorage.getItem('jwt') && localStorage.getItem('user'))
            return {
                   token: JSON.parse(localStorage.getItem('jwt')),
                   user: JSON.parse(localStorage.getItem('user'))
                }
        else
            return false
    },
    
    // isAuthenticated() {
    //     if (typeof window === "undefined") {
    //         console.error("Window object is undefined");
    //         return false;
    //     }
    //     const token = localStorage.getItem('jwt');
    //     const user = localStorage.getItem('user');
    //     console.log("Token from localStorage:", token);
    //     console.log("User from localStorage:", user);
    //     if (token && user) {
    //         try {
    //             const parsedToken = JSON.parse(token);
    //             const parsedUser = JSON.parse(user);
    //             return {
    //                 token: parsedToken,
    //                 user: parsedUser
    //             };
    //         } catch (error) {
    //             console.error("Error parsing token or user:", error);
    //             return false;
    //         }
    //     } else {
    //         console.error("Token or user not found in localStorage");
    //         return false;
    //     }
    // },
    
    isAdmin() {
        const user = JSON.parse(localStorage.getItem('user'))
        return user.role === 'admin'
    },

    authenticate(jwt, user, cb) {
        if (typeof window !== "undefined"){
            localStorage.setItem('jwt', JSON.stringify(jwt))
            localStorage.setItem('user', JSON.stringify(user))
            cb()
        }

    },
    clearJWT(cb) {
        console.log(window)
        if (typeof window !== "undefined"){

            localStorage.removeItem('jwt')
            localStorage.removeItem('user')
        cb()

        }
        //optional
        signout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
        })
    },
    getToken(){
        return JSON.parse(localStorage.getItem('jwt'))
    }
}
export default auth