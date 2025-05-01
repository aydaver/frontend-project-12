import axios from 'axios';

const signUp = async (credentials) => {
    try {
        const response = await axios.post('/api/v1/signup', 
            {   
                username: credentials.userName ,
                password: credentials.password 
            });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default signUp;