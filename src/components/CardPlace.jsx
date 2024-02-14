import React from 'react'

import defaultImg from '../assets/images/defaultPlaceCard.jpg'

function CardPlace({place}) {
  return (
    <div className='cardPlace'>
        {
            place.randomImage ? 
            <img src={'http://127.0.0.1:8000/storage/uploads/'+place.randomImage.image_name} alt={place.place_name} className='cardPlace__img' />
            :
            <img src={defaultImg} alt="image par défaut du lieu" className='cardPlace__img'/>
        }
        {/* <img src={'http://127.0.0.1:8000/storage/uploads/'+place.......} /> */}
        <div className='cardPlace__name'>
            <p>{place.place_name}</p>
        </div>
    </div>
  )
}

export default CardPlace