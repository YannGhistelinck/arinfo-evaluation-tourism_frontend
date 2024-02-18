import React, {useContext, useEffect} from 'react'
import { useLocation } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import { autoScroll } from '../utils/functions'

import Carousel from '../components/Carousel'

function Home() {
  useEffect(() => {
    autoScroll()
  }, [])
  
    const {setUrl} = useContext(GlobalContext)
    const location = useLocation()
    setUrl(location.pathname)
    
  return (
    <div className='mainContainer'>
      <Carousel/>

    </div>
  )
}

export default Home