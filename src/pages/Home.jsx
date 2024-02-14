import React, {useContext} from 'react'
import { useLocation } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'

import Carousel from '../components/Carousel'

function Home() {
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