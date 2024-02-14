import React, {useContext, useState} from 'react'
import { closeContent, clickOutModal, listenEscapeKey } from '../../utils/functions'
import {useForm} from 'react-hook-form' 

import { GlobalContext } from '../../contexts/GlobalContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import cross from '../../assets/icons/cross.svg'

function UpdatePlaceModal({place}) {
    const {setPlaces, subcategories, places, token} = useContext(GlobalContext)

    const [currentPlace, setCurrentPlace] = useState(place)

    const{register, handleSubmit} = useForm()

    const updateCat = async(data)=> {
        const formatedData={
          ...data,
          token: token,
          id:place.id,
        }
        API_FUNCTIONS.updatePlace(formatedData)
        .then(res => {
          const updatedPlaces = places.map(p => (
            p.id === res.data.id ?
                res.data
            :
                p
        ) )
        setPlaces(updatedPlaces)
        closeContent('updatePlaceModal'+place.id)
        })
      }
  listenEscapeKey('updatePlaceModal'+place.id)


  return (
    <div className='modal' id={'updatePlaceModal'+place.id} onClick={(e) => clickOutModal(e, 'updatePlaceModal'+place.id)}>
        <div className='modal__content'> 
            <button onClick={() => closeContent('updatePlaceModal'+place.id)} className='modal__closeButton'><img src={cross} alt="fermer" className='modal__closeImg'/></button>
           
            <form onSubmit={handleSubmit(updateCat)} id='updatePlaceForm' className='adminForm'>
                <label>Nom</label>
                <input type="text" value={currentPlace.place_name} {...register('place_name')} onChange={e => setCurrentPlace(prev => ({...prev, place_name : e.target.value}))}/>

                <label>Description</label>
                <textarea {...register('place_description')} required defaultValue={currentPlace.place_description}></textarea>

                <label>Catégorie</label>
                <select {...register('subcategory_id')} value={currentPlace.subcategory_id} onChange={e => setCurrentPlace(prev => ({...prev, subcategory_id : e.target.value}))} >
                {subcategories.filter(subcategory => subcategory.category_id === 1).map((subcategory, index) => (
                    <option key={index} value={subcategory.id} >{subcategory.subcategory_name}</option>
                ))}
                </select>
                
                <label>Latitude</label>
                <input type="number" min="-90" max="90" step='0.00000001' value={currentPlace.place_lat} {...register('place_lat')} required onChange={e => setCurrentPlace(prev => ({...prev, place_lat : e.target.value}))}/>

                <label>Longitude</label>
                <input type="number" min="-180" max="180" step='0.00000001' value={currentPlace.place_long} {...register('place_long')} required onChange={e => setCurrentPlace(prev => ({...prev, place_long : e.target.value}))}/>

                <button type="submit">Modifier</button>
            </form>
        </div>
    </div>
  )
}

export default UpdatePlaceModal