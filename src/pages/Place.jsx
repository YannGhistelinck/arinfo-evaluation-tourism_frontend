import React, {useContext, useState, useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom'

import Map from '../components/Map'
import CardPlace from '../components/CardPlace'

import { GlobalContext } from '../contexts/GlobalContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'
import { autoScroll } from '../utils/functions'

function Place() {
  useEffect(() => {
    autoScroll()
  }, [])
  
    const location = useLocation()
    const place = location.state
    const {setUrl, setSelectedPlace} = useContext(GlobalContext)
    setUrl(location.pathname)

    const [suggestPlaces, setSuggestPlaces] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [currentµ, setCurrent] = useState(place.id)


    useEffect(() => {
      loadData()
    }, [place])

    const loadData = async() => {
      try{
        const query = {
          paginate: 1,
          itemsPerPage: 3,
          lat: place.place_lat,
          long: place.place_long,
          current: parseInt(place.id)
        }
        const placesData = await API_FUNCTIONS.allPlaces(query)
        setSuggestPlaces(placesData.data)
      }catch(errors){
        console.error(errors)
      }finally{
        setIsLoaded(true)
      }
    }



  return (
    <div className='mainContainer'>
        <div className='topLink'><Link to="/">Accueil</Link> - <Link to='/lieux'>Les lieux à visiter</Link> - <span>{place.place_name}</span></div>
        <h1>{place.place_name}</h1>
        <p className='placesDescription'>{place.place_description}</p>
        
        <Map places={place} suggest={suggestPlaces}/>
        <div className='placesSuggestions'>
          <h2 className='placesSuggestions__title'>Suggestions des lieux les plus proches</h2>
          <div className='placesSuggestions__container'>
            {suggestPlaces.map((place, index) => (
              <Link key={index} to='/lieu' state={place} onMouseOver={() => setSelectedPlace(place.id)} onMouseLeave={() => setSelectedPlace(null)}><CardPlace  place={place}/></Link>
            ))}
          </div>
          

        </div>
    </div>
  )
}

export default Place