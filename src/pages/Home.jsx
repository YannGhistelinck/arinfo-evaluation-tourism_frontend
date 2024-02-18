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
      <h1>Fake Sarthe Tourisme</h1>
      <p className='placesDescription'>Ce site est un faux site de tourisme de la Sarthe développé dans le cadre d'une évaluation de ma formation de développeur. Il est librement inspiré du vrai site de Sarthe Tourisme.</p>
      <p className='placesDescription'>Toutes les photos sont libres de droit et proviennent du site pixabay. Les logos, eux, viennent du site de Sarthe Tourisme et ont été modifiés pour y rajouter la mention "FAKE" afin d'éviter toute confusion.</p>
        
    </div>
  )
}

export default Home