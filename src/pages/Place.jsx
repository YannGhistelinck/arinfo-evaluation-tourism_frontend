import React, {useContext, useState} from 'react'
import { useLocation, Link } from 'react-router-dom'

import Map from '../components/Map'

import { GlobalContext } from '../contexts/GlobalContext'

function Place() {
    const location = useLocation()

    const place = location.state
  return (
    <div className='mainContainer'>
        <div className='topLink'><Link to="/">Accueil</Link> - <Link to='/lieux'>Les lieux à visiter</Link> - <span>{place.place_name}</span></div>
        <h1>{place.place_name}</h1>
        <p className='placesDescription'>{place.place_description}</p>
        
        <Map places={place}/>
    </div>
  )
}

export default Place