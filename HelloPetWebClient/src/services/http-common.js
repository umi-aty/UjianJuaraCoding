import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json",
        // "boundary": "-----------------------------974767299852498929531610575--"
    }
});