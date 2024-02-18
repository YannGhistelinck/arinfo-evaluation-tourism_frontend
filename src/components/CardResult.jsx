import React from 'react'

function CardResult({publication}) {
  return (
    <div className='resultCard'>
        {
            publication.images && <img src="" alt="" className='resultCard__img'/>
        }
        <div className='resultCard__content'>
            <h3 className='resultCard__content__title'>{publication.publication_name}</h3>
            <p className='resultCard__content__description'>{publication.publication_description}</p>
        </div>
    </div>
  )
}

export default CardResult