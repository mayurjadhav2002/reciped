import axios from "axios";
import Cookies from "js-cookie";
axios.defaults.headers.common['Authorization'] = `${Cookies.get('access_token')}`;


export const RegisterQuery = async (props) => {
    try {
        const result = await axios.post('/auth/register', {
            name: props.name,
            email: props.email,
            password: props.password,
            age: props.age,
            gender: props.gender
        });
        return result

    } catch (error) {
        console.error('Error in Register:', error);
        throw error; // rethrow the error for further handling
    }
}

export const LoginQuery = async (props) => {
    try {
        const result = await axios.post('/auth/login', props);
        if(result){
            return result
        }
    } catch (error) {
        console.error('Error in Login:', error);
        throw error; // rethrow the error for further handling
    }

}

export const getAllRecipesOfUser = async(props) =>{
    try {

        const res = await axios.post('/recipe/getallrecipe', {userId: props})
        if (res.status === 200) {
            console.log(res)
            return res.data;
        }
    } catch (error) {
        console.log("Error while fetching the documents", error)
        throw new Error()
    }
}