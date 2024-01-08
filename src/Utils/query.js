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
        console.log("Resuklt", result)
        if (result) {
            return result
        }
    } catch (error) {
        console.error('Error in Login:', error);
        throw error; // rethrow the error for further handling
    }

}

export const getAllRecipesOfUser = async (props) => {
    try {

        const res = await axios.post('/recipe/getRecentlyEditedrecipe', { userId: props })
        if (res.status === 200) {
            console.log(res)
            return res.data;
        }
    } catch (error) {
        console.log("Error while fetching the recipe", error)
        throw new Error()
    }
}

export const getAllRecipe = async (props) => {
    try {

        const res = await axios.get('/recipe/getallrecipe')
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("Error while fetching the recipe", error)
        throw new Error()
    }
}

export const getAsingleRecipe = async(props) => {
    try {
        const res  = await axios.post('/recipe/getsingleRecipe', {id: props})
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log("Error while fetching the recipe", error)
        throw new Error()
    }
}

export const getRecommnededRecipes = async() => {
    try {
        const res  = await axios.get('/recipe/getrecommendedRecipes')
        if (res.status === 200) {
            return res.data;
        }
        
    } catch (error) {
        console.log("Error while fetching the recipe", error)
        throw new Error()
    }
}

export const SearchQuery = async(query) => {
    try {
        const res  = await axios.post('/recipe/searchRecipe?query='+query)
        if (res.status === 200) {
            return res.data;
        }
        
    } catch (error) {
        console.log("Error while fetching the recipe", error)
        throw new Error()
    }
}

export const DeleteRecipe = async(id) => {
    try {
        const res  = await axios.delete('/recipe/deleteRecipe/'+id)
        if (res.status === 200) {
            console.log(res)
            return res;
        }
    } catch (error) {
        console.log("Error while deleting the recipe", error)
        throw new Error()
    }
}