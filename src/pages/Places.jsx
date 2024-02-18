import React, {useContext, useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'
import { autoScroll } from '../utils/functions'

import CardPlace from '../components/CardPlace'
import Map from '../components/Map'



function Places() {
  useEffect(() => {
    autoScroll()
  }, [])
  
  const location = useLocation()
  const [filter, setFilter] = useState()


    const {setUrl, subcategories, setSelectedPlace} = useContext(GlobalContext)

    const [currentPlacePage, setCurrentPlacePage] = useState(1)
    const [places, setPlaces] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState('')

    setUrl(location.pathname)

    useEffect(() => {
      loadData()
    }, [currentPlacePage, filter])


    useEffect(() => {
      setFilter(location.state)
    }, [location.state])

    const loadData = async() => {
      try{
        const itemsPerPage = 6
        const query = {
          paginate: currentPlacePage,
          itemsPerPage: itemsPerPage,
          filter: filter
        }
        const placesData = await API_FUNCTIONS.allPlaces(query)
        setPlaces(placesData.data)
        setNumberOfPages(placesData.numberOfPages)
      }catch(errors){
        console.error(errors)
      }finally{
        setIsLoaded(true)
      }
    }

    

    
  return (
    <div className='mainContainer'>
        <div className='topLink'><Link to="/">Accueil</Link> - <span>Les lieux à visiter</span></div>
        <h1>Les lieux à visiter</h1>
        <p className='placesDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className='placesFilters'>
          <div onClick={() => {
            setFilter(null)
            setCurrentPlacePage(1)
            }} className={filter === null ? 'placesFilters__item placesFilters__item--active' : 'placesFilters__item'}>Tous</div>
          {
            subcategories.filter(subcategory => subcategory.category_id === 1).map((subcategory, index) => (
              <div key={index} onClick={() => {
                setFilter(subcategory.id) 
                setCurrentPlacePage(1)
              }} className={filter === subcategory.id ? 'placesFilters__item placesFilters__item--active' : 'placesFilters__item'}>{subcategory.subcategory_name}</div>
            ))
          }
        </div>
        {
          isLoaded ? 
          (
            places.length > 0 ? 
              <div className='placesContainer'>
                {places.map((place, index) => (
                  <Link key={index} to='/lieu' state={place} onMouseOver={() => setSelectedPlace(place.id)} onMouseLeave={() => setSelectedPlace(null)}><CardPlace  place={place}/></Link>
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

        {
          isLoaded && numberOfPages > 1? 
            <div className='places__paginate'>
              {currentPlacePage>1 ? 
              <button className='places__paginate__button' onClick={() => setCurrentPlacePage(currentPlacePage-1)}>←</button>
            :
            <button className='places__paginate__button places__paginate__button--inactive'>←</button>} 
              <div className='places__paginate__count'>{currentPlacePage}/{numberOfPages}</div>
              {currentPlacePage<numberOfPages ? 
              <button onClick={() => setCurrentPlacePage(currentPlacePage+1)} className='places__paginate__button'>→</button>
            :
            <button className='places__paginate__button places__paginate__button--inactive'>→</button>}
            </div> 
          :
          null
        }
        {
          isLoaded && places.length > 0 &&<Map places={places}/>
        }
        
    </div>
  )
}

export default Places