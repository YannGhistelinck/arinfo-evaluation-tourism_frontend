import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api"

const API_ROUTES={
    CATEGORIES: `${API_URL}/categories`,
    SUBCATEGORIES: `${API_URL}/subcategories`,
    LOGIN: `${API_URL}/login`,
    LOGOUT: `${API_URL}/logout`,
    REGISTER: `${API_URL}/register`,
    CURRENT_USER: `${API_URL}/currentuser`,
    USERS: `${API_URL}/users`,
    PLACES: `${API_URL}/places`,
    PUBLICATIONS: `${API_URL}/publications`,
    IMAGES : `${API_URL}/images`,
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
    allUsers: async(token)=>{
        try{
            const response = await axios.get(API_ROUTES.USERS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response)return response.data
        }catch(e){
            return e
        }
    },
    register: async(data)=>{
        try{
            const response = await axios.post(API_ROUTES.REGISTER, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            })
            if(response)return response.data.data.user
        }catch(e){
            console.error(e)
        }
    },
    updateUser: async(data) => {
        try{
            const response = await axios.post()
        }catch(e){
            return e
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
    updateCategory: async(data)=>{
        try{
            const response = await axios.put(API_ROUTES.CATEGORIES+'/'+data.id, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`
                }
            })
            if(response)return response.data
        }catch(errors){
            return errors
        }
    },
    deleteCategory: async(id, token)=>{
        try{
            const response = await axios.delete(API_ROUTES.CATEGORIES+'/'+id,{
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(response){
                return response
            }
        }catch(errors){
            return errors
        }
    },
    // SUB-CATEGORIES
    allSubcategories: async () => {
        try {
            const response = await axios.get(API_ROUTES.SUBCATEGORIES)
            return response.data
        } catch (error) {
            console.error(error)
            return []
        }
    },
    addSubcategory: async(data)=>{
        try{
            const response = await axios.post(API_ROUTES.SUBCATEGORIES, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                }
            })
            if(response) return response.data
        }catch(e){
            return e
        }
    },
    updateSubcategory: async(data)=>{
        try{
            const response = await axios.put(API_ROUTES.SUBCATEGORIES+'/'+data.id, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                }
            })
            if(response)return response.data
        }catch(e){
            console.log("toobad", e);
            return e
        }
    },
    deleteSubcategory: async(id, token)=>{
        try{
            const response = await axios.delete(API_ROUTES.SUBCATEGORIES+'/'+id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if(response)return response
        }catch(e){
            console.error(e)
        }
    },
    // PLACES
    allPlaces: async(query)=>{
        try{
            const response = await axios.get(API_ROUTES.PLACES, {params: query})
            return response.data
        }catch(e){
            console.error(e)
        }
    },
    addPlace: async(data)=>{
        try{
            const response = await axios.post(API_ROUTES.PLACES, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                }
            })
            return response.data
        }catch(e){
            console.error(e)
        }
    },
    deletePlace: async(id, token)=>{
        try{
            const response = await axios.delete(API_ROUTES.PLACES+'/'+id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response
        }catch(e){
            console.error(e)
        }
    },
    updatePlace: async(data)=>{
        try{
            const response = await axios.put(API_ROUTES.PLACES+'/'+data.id, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                }
            })
            return response.data
        }catch(e){
            console.error(e)

        }
    },
    // PUBLICATIONS
    allPublications: async()=>{
        try{
            const response = await axios.get(API_ROUTES.PUBLICATIONS)
            return response
        }catch(e){
            console.error(e)
        }
    },
    addPublication: async(data)=>{
        try{
            const response = await axios.post(API_ROUTES.PUBLICATIONS, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                }
            })
            return response.data
        }catch(e){
            console.error(e)
        }
    },
    deletePublication: async(id, token)=>{
        try{
            const response = await axios.delete(API_ROUTES.PUBLICATIONS+'/'+id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response
        }catch(e){
            console.error(e)
        }
    },
    updatePublication: async(data)=>{
        try{
            const response = await axios.put(API_ROUTES.PUBLICATIONS+'/'+data.id, data, {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                }
            })
            return response.data
        }catch(e){
            console.error(e)
        }
    },
    // IMAGES
    allImages: async()=>{
        try{
            const response = await axios.get(API_ROUTES.IMAGES)
            return response.data

        }catch(e){
            console.error(e)
        }
    },
    addImage: async(data, token)=>{
        try{
            const response = await axios.post(API_ROUTES.IMAGES, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response
        }catch(e){
            console.error(e)
            return 'error'
        }
    },
    deleteImage: async(id, token)=>{
        try{
            const response = await axios.delete(API_ROUTES.IMAGES+'/'+id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return response
        }catch(e){
            console.error(e)
            return 'error'
        }
    }

}