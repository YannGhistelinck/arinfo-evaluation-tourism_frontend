import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import {AdminContext } from '../contexts/AdminContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'

import AdminSideMenu from '../components/AdminSideMenu'
import AdminRedactors from '../components/adminSubpages/AdminRedactors'
import AdminPlaces from '../components/adminSubpages/AdminPlaces'
import AdminPublications from '../components/adminSubpages/AdminPublications'
import AdminCategories from '../components/adminSubpages/AdminCategories'
import AdminSubcategories from '../components/adminSubpages/AdminSubcategories'

function Admin() {
    const navigate = useNavigate()
    const{token, setToken, setUrl, setIsAdmin, isAdmin, categories, user, setUser}=useContext(GlobalContext)
    const [currentAdminContent, setCurrentAdminContent]=useState(localStorage.getItem('currentAdminContent') || 'redactors')
    
    const [publications, setPublications] = useState([])
    const [images, setImages] = useState([])
    const [redactors, setRedactors] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    setUrl("admin")
    
    const isConnected = async(data) => {
        if(data === null){
            navigate('/login')
            setToken('')
        }else{
            try{
                const response = await API_FUNCTIONS.currentUser(data)
                if(response.data && response.data.user){
                    setIsAdmin(true)
                    setUser(response.data.user)
                }else if(response.response && response.response.status===401){
                    setIsAdmin(false)
                    localStorage.removeItem('token')
                    navigate('/login') 
                } 
            }catch(e){
                console.error(e)
                setToken('')
                localStorage.removeItem('token')
            }
        }
    }

    const loadData = async()=>{
        try{
            const[
                redactorsData,
            ] = await Promise.all([
                API_FUNCTIONS.allUsers(token)
            ])
            setRedactors(redactorsData)

        }catch(errors){
            console.error(errors)
        }
    }


    useEffect(() => {
        isConnected(localStorage.getItem("token"))
        loadData()
        setIsLoaded(true)
    }, [token])




  return (
    <AdminContext.Provider value={{currentAdminContent, setCurrentAdminContent, redactors, setRedactors, publications, setPublications, images, setImages}}>
        {isLoaded ? 
        <div className='dashboard'>
            <AdminSideMenu/>
            {currentAdminContent === 'redactors' && <AdminRedactors/> }
            {currentAdminContent === 'places' && <AdminPlaces/> }
            {currentAdminContent === 'publications' && <AdminPublications/> }
            {currentAdminContent === 'categories' && <AdminCategories/> }
            {currentAdminContent === 'subcategories' && <AdminSubcategories/> }
            
        </div>
        :
        null
        }
        
    </AdminContext.Provider>
    
  )
}

export default Admin