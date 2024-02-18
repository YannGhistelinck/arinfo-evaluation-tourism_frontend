import React, {useContext, useEffect, useState} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'
import { autoScroll } from '../utils/functions'

import CardPlace from '../components/CardPlace'
import CardResult from '../components/CardResult'

function Search() {
  useEffect(() => {
    autoScroll()
  }, [])
  

    const {search, setUrl, setSelectedPlace} = useContext(GlobalContext)
    const location = useLocation()
    const navigate = useNavigate()
    setUrl(location.pathname)

    const [currentSearchPlacePage, setCurrentSearchPlacePage] = useState(1)
    const [placesResults, setPlacesResults] = useState([])
    const [publicationsResults, setPublicationsResults] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [numberOfPlacesPages, setNumberOfPlacesPages] = useState()
    const [numberOfPublicationsPages, setNumberOfPublicationsPages] = useState()
    const [numberOfResults, setNumberOfResults] = useState()

    useEffect(() => {
        if(search){
            loadData()
        }else{
            navigate('/')
        }
    }, [search])
  
      const loadData = async() => {
        try{
          const itemsPerPage = 10
          const query = {
            paginate: currentSearchPlacePage,
            itemsPerPage: itemsPerPage,
            search: search,
            status_id: 2
          }
          const placesData = await API_FUNCTIONS.allPlaces(query)
          const publicationsData = await API_FUNCTIONS.allPublications(query)

          setPlacesResults(placesData.data)
          setNumberOfPlacesPages(placesData.numberOfPages)

          setPublicationsResults(publicationsData.data)
          setNumberOfPlacesPages(publicationsData.numberOfPages)
          
          setNumberOfResults(parseInt(placesData.numberOfResults) + parseInt(publicationsData.numberOfResults))

        }catch(errors){
          console.error(errors)
        }finally{
          setIsLoaded(true)
        }
      }

  return (
    <div className='mainContainer'> 
        <div className='topLink'><Link to="/">Accueil</Link> - <span>Votre recherche "{search}"</span></div>

        <h1> {numberOfResults} Résultat(s) pour "{search}"</h1>

        <div className='results'>
            {
                placesResults && isLoaded ? 
                <div className='results__bloc'>
                    <h2 className='results__bloc__title'>Lieux</h2>
                    <div className='results__bloc__container'>
                      {placesResults.map((place, index) => (
                          <Link key={index} to='/lieu' state={place} onMouseOver={() => setSelectedPlace(place.id)} onMouseLeave={() => setSelectedPlace(null)} >
                              <CardPlace place={place} key={index}/>
                          </Link>
                      ))} 
                    </div>
                   
                </div>
                
                :
                <p>Aucun lieu ne correspond à votre recherche..."{search}"</p>
            }
            {
                publicationsResults && isLoaded ? 
                <div className='results__bloc'>
                    <h2 className='results__bloc__title'>Publications</h2>
                    {publicationsResults.map((publication, index) => (
                        <Link to="/publication" key={index} className='results__bloc__link'><CardResult publication={publication}/></Link>
                    ))}
                </div>
                
                :
                <p>Aucune publication ne correspond à votre recherche..."{search}"</p>
            }
        </div>
        


    </div>
  )
}

export default Search