import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Menu from './Menu'
import HeaderToolbar from './HeaderToolbar'

import logo from '../assets/images/logo.png'
import { GlobalContext } from '../contexts/GlobalContext'

function Header() {

  const {url} = useContext(GlobalContext)

  const overHead = ()=>{
    document.getElementById('header').style.backgroundColor = '#222222FF'
  }  
  
  const overHeadLeave = ()=>{
    if(url === '/'){
      document.getElementById('header').style.backgroundColor = '#22222200'
    }
    
  }
  useEffect(() => {
    if(url === '/'){
      document.getElementById('header').style.position = "fixed"
      document.getElementById('header').style.backgroundColor= "#22222200"
    }else{
      document.getElementById('header').style.position = "relative"
      document.getElementById('header').style.backgroundColor= "#222222FF"
    }
  }, [url])
  

  return (
    <header className='header' id='header' onMouseOver={() => overHead()} onMouseLeave={() => overHeadLeave()}>

      <img src={logo} alt='FAKE Sarthe Tourisme' className='header__logo'/>
      <Menu/>
      <HeaderToolbar/>

    </header>
  )
}

export default Header