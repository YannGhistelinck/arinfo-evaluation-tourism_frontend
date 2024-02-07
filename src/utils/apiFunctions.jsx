import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api"

const API_ROUTES={
    CATEGORIES: `${API_URL}/categories`,
    SUBCATEGORIES: `${API_URL}/subcategories`,
    LOGIN: `${API_URL}/login`,
    LOGOUT: `${API_URL}/logout`,
    REGISTER: `${API_URL}/register`,
    CURRENT_USER: `${API_URL}/currentuser`,
}

export const API_FUNCTIONS={

    // USERS
    login: async(data) => {
        try{
            const response = await axios.post(API_ROUTES.LOGIN, data)
            if(response.data.data.access_token.token){
                return response
            }
        }catch(e){
            return e
        }
    },
    currentUser: async(data)=>{
        
        try{
            const response = await axios.get(API_ROUTES.CURRENT_USER, {
                headers: {
                    Authorization: `Bearer ${data}`,
                  }
                })
            if(response.data){
                return response.data
            }
        }catch(e){
            return e
        }

    },
    logout: async(token)=>{
        try{
            const response = await axios.post(API_ROUTES.LOGOUT,null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response){
                return response
            }
        }catch(e){
            console.error(e)
        }
    },
    //CATEGORIES
    allCategories: async () => {
        try {
            const response = await axios.get(API_ROUTES.CATEGORIES)
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    },
    addCategory: async(data)=>{
        try{
            const response = await axios.post(API_ROUTES.CATEGORIES, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            })
            if(response){
                return response.data
            }
        }catch(errors){
            return errors
        }
    },

    allSubcategories: async () => {
        try {
            const response = await axios.get(API_ROUTES.SUBCATEGORIES)
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    },

}