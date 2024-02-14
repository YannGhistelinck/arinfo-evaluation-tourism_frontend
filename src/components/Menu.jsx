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

function Menu() {
    const {categories, subcategories} = useContext(GlobalContext)
  return (
    <nav className='menu'>
      <div className='menu__container'>
        <Link to='/' className='menu__link menu__link--first'>Découvrir<div className='menu__link__square'></div></Link>
        {/* {categories.map((category, index) => (
            <Link to={"/"+category.category_name.toLowerCase()} key={index} className='menu__link' onMouseEnter={() => openMenu('submenu'+category.id)} onMouseLeave={() => closeMenu('submenu'+category.id)}>{category.category_name}<div className='menu__link__square' ></div></Link>
        ))} */}
        <Link to="/lieux" className='menu__link' onClick={() => closeMenu('submenu'+categories[0].id)} onMouseEnter={() => openMenu('submenu'+categories[0].id)} onMouseLeave={() => closeMenu('submenu'+categories[0].id)}>{categories[0].category_name}<div className='menu__link__square' ></div></Link>
        <Link to="/evenements" className='menu__link' onClick={() => closeMenu('submenu'+categories[1].id)} onMouseEnter={() => openMenu('submenu'+categories[1].id)} onMouseLeave={() => closeMenu('submenu'+categories[1].id)}>{categories[1].category_name}<div className='menu__link__square' ></div></Link>
        <Link to='/' className='menu__link menu__link--first'>Agenda<div className='menu__link__square'></div></Link>
      </div>
    </nav>
  )
}

export default Menu