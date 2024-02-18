import React, {useContext, useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'
import { autoScroll } from '../utils/functions'

import { API_STORAGE } from '../utils/apiFunctions'

function Publication() {
  useEffect(() => {
    autoScroll()
  }, [])
  
  const location = useLocation()
  const {setUrl} = useContext(GlobalContext)
  setUrl(location.pathname)
  const { publication, images } = location.state



  return (
    <div className='mainContainer'>
        <div className='topLink'><Link to="/">Accueil</Link> - <Link to="/blog">Blog</Link> - <span>{publication.publication_name}</span></div>
        <h1>{publication.publication_name}</h1>
        <p className='publication__description'>{publication.publication_description}</p>
        <div className='publication__slider'>
          {images.map((image, index) => (
            // <img src={'http://127.0.0.1:8000/storage/uploads/'+image.image_name} alt={publication.publication_name} className='publication__slider__img' key={index}/>
            <img src={API_STORAGE+image.image_name} alt={publication.publication_name} className='publication__slider__img' key={index}/>
          ))}
        </div>
    </div>
  )
}

export default Publication