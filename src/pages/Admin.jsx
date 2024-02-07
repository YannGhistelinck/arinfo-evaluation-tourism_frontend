import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import {AdminContext } from '../contexts/AdminContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'

import AdminSideMenu from '../components/AdminSideMenu'
import AdminRedactors from '../components/AdminRedactors'
import AdminPlaces from '../components/AdminPlaces'
import AdminPublications from '../components/AdminPublications'
import AdminCategories from '../components/AdminCategories'
import AdminSubcategories from '../components/AdminSubcategories'

function Admin() {
    const navigate = useNavigate()
    const{token, setToken, setUrl, setIsAdmin, isAdmin, categories, user, setUser}=useContext(GlobalContext)
    const [currentAdminContent, setCurrentAdminContent]=useState(localStorage.getItem('currentAdminContent') || 'redactors')
    
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


    useEffect(() => {
        isConnected(localStorage.getItem("token"))
        setIsLoaded(true)
    }, [token])




  return (
    <AdminContext.Provider value={{currentAdminContent, setCurrentAdminContent}}>
        {isLoaded ? 
        <div className='dashboard'>
            <AdminSideMenu/>
            {currentAdminContent === 'redactors' ? <AdminRedactors/> : null}
            {currentAdminContent === 'places' ? <AdminPlaces/> : null}
            {currentAdminContent === 'publications' ? <AdminPublications/> : null}
            {currentAdminContent === 'categories' ? <AdminCategories/> : null}
            {currentAdminContent === 'subcategories' ? <AdminSubcategories/> : null}
            
        </div>
        :
        null
        }
        
    </AdminContext.Provider>
    
  )
}

export default Admin