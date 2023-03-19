const axios = require("axios")

const config = {
    baesURL : process.env.REACT_APP_BACKEND_SERVER,
    headers : {
        withCredentials : true,
        'Content-type' : 'application/json'
    }
}

// export const request = axios.create({
//     ...config,
// })