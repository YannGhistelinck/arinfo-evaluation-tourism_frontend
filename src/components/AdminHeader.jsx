import React, {useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'

function AdminHeader() {
  const navigate = useNavigate()
  const{token, user, setUser, setIsAdmin, url} = useContext(GlobalContext)


  const logout = async(data)=> {
    try{
      const response = await API_FUNCTIONS.logout(data)
      if(response){
        localStorage.removeItem('token')
        setUser([])
        setIsAdmin(false)
        navigate('/')
      }
    }catch(e){
      console.log("erreur de déconnexion : ", e)
    }
    
  }

  
  

  return (
    <div className='adminHeader'>
      <div className='adminHeader__name'>
        <p>{user.firstname} </p>
        {user.role_id === 1 ? <p>Rédacteur</p> : <p>Administrateur</p>}
      </div>
      {url === 'admin' ? <Link to="/" className='adminHeader__link'>Retour sur le site</Link> : <Link to='/admin' className='adminHeader__link'>Dashboard</Link>}
      
      <p onClick={() => logout(localStorage.getItem('token'))} className='adminHeader__logout'>Déconnexion</p>
    </div>
  )
}

export default AdminHeader