import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'

const openMenu = (id) => {
  document.getElementById(id).style.top = "100px"
  document.getElementById("header").style.backgroundColor = "#222222FF"
}
 const closeMenu = (id) => {
  document.getElementById(id).style.top = '-100vh'
  document.getElementById("header").style.backgroundColor = "initial"
 }

function Submenu() {

    const {categories, subcategories} = useContext(GlobalContext)

  return (
    <div>
        
        {categories.map((category, index) => (
          <div key={index} id={'submenu'+category.id} className='submenu' onMouseEnter={() => openMenu('submenu'+category.id)} onMouseLeave={() => closeMenu('submenu'+category.id)}>
              <button onClick={() => closeMenu('submenu'+category.id)} className='submenu__closeButton'>X</button>
              <div className='submenu__container'>
                  {subcategories.filter(subcategory => subcategory.category_id === category.id).map((subcategory, index) => (
                    <Link className='submenu__container__link' key={index} state={subcategory.id} onClick={() => closeMenu('submenu'+category.id)}>{subcategory.subcategory_name}</Link>
                  ))}

              </div>
              
          </div>
        ))}
    </div>
  )
}

export default Submenu