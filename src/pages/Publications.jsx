import React, {useContext, useEffect, useState} from 'react'
import { useLocation, Link } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'
import { autoScroll } from '../utils/functions'

import CardPublication from '../components/CardPublication'

function Publications() {
  useEffect(() => {
    autoScroll()
  }, [])
  
    const location = useLocation()
    const {setUrl, subcategories} = useContext(GlobalContext)

    setUrl(location.pathname)

    const [filter, setFilter] = useState()
    const [publications, setPublications] = useState([])
    const [images, setImages] = useState([])
    const [currentPublicationPage, setCurrentPublicationPage] = useState(1)
    const [isLoaded, setIsLoaded] = useState(false)
    const [numberOfPages, setNumberOfPages] = useState(0)


    useEffect(() => {
        loadData()
    }, [filter, currentPublicationPage])


    useEffect(() => {
        setFilter(location.state)
    }, [location.state])

    const loadData = async() => {
        try{
            const itemsPerPage = 6
            const query = {
            paginate: currentPublicationPage,
            itemsPerPage: itemsPerPage,
            filter: filter,
            status_id: 2
            }
            const publicationsData = await API_FUNCTIONS.allPublications(query)
            setPublications(publicationsData.data)
            setNumberOfPages(publicationsData.numberOfPages)
            setImages(publicationsData.images)

        }catch(errors){
            console.error(errors)
        }finally{
            setIsLoaded(true)
        }
    }

  return (
    <div className='mainContainer'>
        <div className='topLink'><Link to="/">Accueil</Link> - <span>Le Blog</span></div>
        <h1>Le Blog</h1>
        <p className='placesDescription'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <div className='placesFilters'>
          <div onClick={() => {
            setFilter(null)
            setCurrentPublicationPage(1)
            }} className={filter === null ? 'placesFilters__item placesFilters__item--active' : 'placesFilters__item'}>Tous</div>
          {
            subcategories.filter(subcategory => subcategory.category_id === 2).map((subcategory, index) => (
              <div key={index} onClick={() => {
                setFilter(subcategory.id)
                setCurrentPublicationPage(1)
              }} className={filter === subcategory.id ? 'placesFilters__item placesFilters__item--active' : 'placesFilters__item'}>{subcategory.subcategory_name}</div>
            ))
          }
        </div>

        {
            isLoaded ? 
            (publications.length > 0 ? 
                <div className='publicationContainer'>
                    {
                        publications.map((publication, index) => (
                            <Link to='/publication' key={index} state={{publication: publication, images:images.filter(image => image.publication_id === publication.id)}}>
                                <CardPublication publication={publication} images={images.filter(image => image.publication_id === publication.id)} />
                            </Link>
                        ))
                    }
                </div>
                :
                <p>Il n'y a pas encore de publication dans cette catégorie...</p>
            )
            :
            <div className='placesContainer'>
                Chargement...
            </div>
        }

{
          isLoaded && numberOfPages > 1? 
            <div className='places__paginate'>
              {currentPublicationPage>1 ? 
              <button className='places__paginate__button' onClick={() => setCurrentPublicationPage(currentPublicationPage-1)}>←</button>
            :
            <button className='places__paginate__button places__paginate__button--inactive'>←</button>} 
              <div className='places__paginate__count'>{currentPublicationPage}/{numberOfPages}</div>
              {currentPublicationPage<numberOfPages ? 
              <button onClick={() => setCurrentPublicationPage(currentPublicationPage+1)} className='places__paginate__button'>→</button>
            :
            <button className='places__paginate__button places__paginate__button--inactive'>→</button>}
            </div> 
          :
          null
        }
          
        
    </div>
  )
}

export default Publications