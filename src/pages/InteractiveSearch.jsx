import React, {useContext, useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'
import { autoScroll } from '../utils/functions'

import Map from '../components/Map'
import CardPlace from '../components/CardPlace'

function InteractiveSearch() {
  useEffect(() => {
    autoScroll()
  }, [])
  
    const location = useLocation()
    const {bounds, setUrl} = useContext(GlobalContext)

    setUrl(location.pathname)


    const [filter, setFilter] = useState()
    const [places, setPlaces] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [numberOfResults, setNumberOfResults] = useState()


    
    useEffect(() => {
        if(bounds){
            
            loadData()
        }
      }, [bounds])
  
  
      useEffect(() => {
        setFilter(location.state)
      }, [location.state])
  
      const loadData = async() => {
        try{
          const itemsPerPage = 6
          if(!bounds){
              const bounds = {
                _northEast: {
                    lat: 48.01171690383988,
                    lng: 0.22311687469482425,
                },
                _southWest: {
                    lat: 48.003562776086895,
                    lng: 0.17161846160888675
                }
          }
          
          }
          const query = {
            filter: filter,
            bounds: {
                NE_lat: bounds._northEast.lat,
                NE_long: bounds._northEast.lng,
                SW_lat: bounds._southWest.lat,
                SW_long: bounds._southWest.lng,
            }
          }
          const placesData = await API_FUNCTIONS.allPlaces(query)
          setPlaces(placesData.data)
          setNumberOfResults(placesData.numberOfResults)
        }catch(errors){
          console.error(errors)
        }finally{
          setIsLoaded(true)
        }
      }



  return (
    <div className='mainContainer'>
        <div className='topLink'><Link to="/">Accueil</Link> - <span>Recherche Interactive</span></div>
        <h1>Recherche Interactive</h1>
        <p className='interactiveSearch__description'>Cet outil de recherche interactive vous permet d'afficher les lieux répertoriés en vous déplaçant sur la carte.</p>
        <Map places={places} interactive={true}/>

        {
          isLoaded ? 
          (
            places.length > 0 ? 
              <div className='placesContainer'>
                {places.map((place, index) => (
                  <Link key={index} to='/lieu' state={place} ><CardPlace  place={place}/></Link>
                ))}
              </div> 
              :
              <p className='placesDescription'>Il n'y a pas encore de lieu dans cette catégorie...</p>
          )
            
          :
          <div className='placesContainer'>
            Chargement...
          </div>
        }
    </div>
  )
}

export default InteractiveSearch