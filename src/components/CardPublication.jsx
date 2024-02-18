import React from 'react'
import { API_STORAGE } from '../utils/apiFunctions'

function CardPublication({publication, images}) {

  return (
    <div className='publicationCard'>
        {
            images && <img src={API_STORAGE+images[0].image_name} alt={publication.publication_name} className='publicationCard__img'/>
        }
        <div className='publicationCard__content'>
            <h3 className='publicationCard__content__title'>{publication.publication_name}</h3>
            <p className='publicationCard__content__description'>{publication.publication_description}</p>
        </div>

    </div>
  )
}

export default CardPublication