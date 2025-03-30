import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const signUpUser = async ( email, password) => {
    try {
        const response = await axios.post(`${backendUrl}/signup`, {email, password}, { withCredentials: true });
        const data = await response.data;
        return data
    }

    catch (error) {
        console.log('Error signingup in api: ' + error);
    }
}


const logInUser = async (email, password) => {

    try {
        const response = await axios.post(`${backendUrl}/login`, { email, password }, { withCredentials: true });
        const data = await response.data;
        return data        
    }

    catch (error) {
        console.log('Error logging in api: ' + error.response.status);

        if(error.response.status === 401){
            console.error("User is not registered, Please Signup !");
        }

        if(error.response.status === 403){
            console.error("Password Incorrect !");
        }
    }
}

const checkAuthStatus = async () => {

    try {
        const response = await axios.get(`${backendUrl}/auth`, { withCredentials: true });
        const data = await response.data;
        console.log(data);
        return data;
    }

    catch (error) {
        console.log('Error auth api: ' + error);
    }
}


const logoutUser = async () => {
    try {
        const res = await axios.get(`${backendUrl}/logout`, { withCredentials: true });
        const data = await res.data;
        return data;
    }

    catch (error) {
        console.log('Error logout api: ' + error);
    }
};



export { signUpUser, logInUser, checkAuthStatus, logoutUser };