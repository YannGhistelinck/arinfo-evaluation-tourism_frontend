import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import Menu from './Menu'
import HeaderToolbar from './HeaderToolbar'

import logo from '../assets/images/logo.png'
import { GlobalContext } from '../contexts/GlobalContext'

function Header() {

  const {url, mobileMenuButton, setMobileMenuButton} = useContext(GlobalContext)
  

  const overHead = ()=>{
    document.getElementById('header').style.backgroundColor = '#222222FF'
  }  
  
  const overHeadLeave = ()=>{
    if(url === '/' && mobileMenuButton === 'closed'){
      document.getElementById('header').style.backgroundColor = '#22222200'
    }
    
  }
  useEffect(() => {
    if(url === '/'){
      document.getElementById('header').style.position = "fixed"
      document.getElementById('header').style.backgroundColor= "#22222200"
    }else{
      document.getElementById('header').style.position = "sticky"
      document.getElementById('header').style.top = "0"
      document.getElementById('header').style.backgroundColor= "#222222FF"
    }
  }, [url])
  
  useEffect(() => {
    if(mobileMenuButton === 'opened'){
      document.getElementById('mobileMenuButton--opened').style.display='none'
      document.getElementById('mobileMenuButton--closed').style.display='initial'
    }else{
      document.getElementById('mobileMenuButton--opened').style.display='initial'
      document.getElementById('mobileMenuButton--closed').style.display='none'
    }
  }, [mobileMenuButton])

  const toggleMenu = () => {
    if(mobileMenuButton === 'closed'){
      document.getElementById('menu').style.left = '0'
      setMobileMenuButton('opened')      
    }else{
      document.getElementById('menu').style.left = '-500px'
      setMobileMenuButton('closed')
    }
  }



function handleClickOutside(event) {
  const menuElement = document.getElementById('menu')
  const menuContent = document.getElementById('menu__content')
      if (menuElement && !menuElement.contains(event.target) && menuContent && !menuContent.contains(event.target)) {
        if (mobileMenuButton === 'opened') {
          toggleMenu();
        }
      }
    }


  useEffect(() => {
    
    if(mobileMenuButton === 'opened'){
      document.addEventListener('click', handleClickOutside);
    }else{
      document.removeEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuButton]);

    
 


  return (
    <header className='header' id='header' onMouseOver={() => overHead()} onMouseLeave={() => overHeadLeave()} >
      <div className='header__menuButtons' onClick={(e) => {e.stopPropagation(); toggleMenu()}}>
        <FontAwesomeIcon icon={faBars} className='header__menuButtons__button header__menuButtons__button--opened' id='mobileMenuButton--opened' />
        <FontAwesomeIcon icon={faXmark} className='header__menuButtons__button header__menuButtons__button--closed' id='mobileMenuButton--closed' />
      </div>

      <Link to='/'><img src={logo} alt='FAKE Sarthe Tourisme' className='header__logo'/></Link>
      <Menu/>
      <HeaderToolbar/>

    </header>
  )
}

export default Header