import axios from "axios"

export const axiosInstance = axios.create({
    baseURL:"http://localhost:5001/api",
    withCredentials:true // sen cookies with the request
})

