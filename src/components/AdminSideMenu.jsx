import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import { AdminContext } from '../contexts/AdminContext'

function AdminSideMenu() {

  const{currentAdminContent, setCurrentAdminContent} = useContext(AdminContext)
  const{user} = useContext(GlobalContext)

  const changeContent = (link)=>{
    setCurrentAdminContent(link)
    localStorage.setItem('currentAdminContent', link)
  }

  return (
    <aside className='adminSideMenu'>
        <h2 className='adminSideMenu__title'>Menu</h2>
        {user.role_id === 2 ? 
          <div className='adminSideMenu__adminPart'>
            <h3>Administrateur</h3>
            <div onClick={() => changeContent('redactors')} className='adminSideMenu__link'>Rédacteurs</div>
            <div onClick={() => changeContent('categories')} className='adminSideMenu__link'>Catégories</div>
          </div> 
          :
          null 
        }
        <h3>Rédacteurs</h3>
        
        <div onClick={() => changeContent('places')} className='adminSideMenu__link'>Lieux</div>
        <div onClick={() => changeContent('publications')} className='adminSideMenu__link'>Publications</div>
        
        <div onClick={() => changeContent('subcategories')} className='adminSideMenu__link'>Sous-catégories</div>
    </aside>
  )
}

export default AdminSideMenu