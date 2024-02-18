import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'



function Menu() {
  const {categories, setMobileMenuButton} = useContext(GlobalContext)

  const openSubmenu = (id) => {
    document.getElementById(id).style.top = "100px"
    document.getElementById("header").style.backgroundColor = "#222222FF"
  }
  const closeSubmenu = (id) => {
    document.getElementById(id).style.top = '-100vh'
    document.getElementById("header").style.backgroundColor = "initial"
  }

  let isMobileMode
  
    if(window.window.innerWidth <= 990){
      isMobileMode= true
    }else{
      isMobileMode = false
    }
    

  const closeMenu = () => {
    document.getElementById('menu').style.left = '-500px'
    setMobileMenuButton('closed')
  }

  


  return (
    <nav className='menu' id="menu" >
      <div className='menu__container' id='menu__content'>
        <Link to='/' className='menu__link menu__link--first' onClick={() => isMobileMode && closeMenu()}>Découvrir<div className='menu__link__square'></div></Link>
        <Link to="/lieux" className='menu__link' onClick={() => !isMobileMode ? closeSubmenu('submenu'+categories[0].id) : closeMenu()} onMouseEnter={() => !isMobileMode && openSubmenu('submenu'+categories[0].id)} onMouseLeave={() => closeSubmenu('submenu'+categories[0].id)}>{categories[0].category_name}<div className='menu__link__square' ></div></Link>
        <Link to="/blog" className='menu__link' onClick={() => !isMobileMode ? closeSubmenu('submenu'+categories[1].id) : closeMenu()} onMouseEnter={() => !isMobileMode && openSubmenu('submenu'+categories[1].id)} onMouseLeave={() => closeSubmenu('submenu'+categories[1].id)}>{categories[1].category_name}<div className='menu__link__square' ></div></Link>
        <Link to='/' className='menu__link menu__link--first' onClick={() => isMobileMode && closeMenu()}>Agenda<div className='menu__link__square'></div></Link>
      </div>
    </nav>
  )
}

export default Menu