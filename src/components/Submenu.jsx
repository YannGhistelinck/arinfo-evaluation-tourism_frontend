import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'

const openSubmenu = (id) => {
  document.getElementById(id).style.top = "100px"
  document.getElementById("header").style.backgroundColor = "#222222FF"
}
 const closeSubmenu = (id) => {
  document.getElementById(id).style.top = '-100vh'
  document.getElementById("header").style.backgroundColor = "initial"
 }

function Submenu() {

    const {categories, subcategories} = useContext(GlobalContext)

  return (
    <div>
        
        {categories.map((category, index) => (
          <div key={index} id={'submenu'+category.id} className='submenu' onMouseEnter={() => openSubmenu('submenu'+category.id)} onMouseLeave={() => closeSubmenu('submenu'+category.id)}>
              <button onClick={() => openSubmenu('submenu'+category.id)} className='submenu__closeButton'>🗙</button>
              <div className='submenu__container'>
                  {subcategories.filter(subcategory => subcategory.category_id === category.id).map((subcategory, index) => (
                    <Link to={category.id === 1  ? '/lieux' : '/blog'} className='submenu__container__link' key={index} state={subcategory.id} onClick={() => closeSubmenu('submenu'+category.id)}>{subcategory.subcategory_name}</Link>
                  ))}

              </div>
              
          </div>
        ))}
    </div>
  )
}

export default Submenu