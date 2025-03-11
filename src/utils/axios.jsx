import axios from "axios";

const Instance = axios.create({
    baseURL: "https://fakestoreapi.com"
})

export default Instance;