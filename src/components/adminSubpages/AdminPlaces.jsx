import React, {useContext} from 'react'
import {useForm} from 'react-hook-form'

import { GlobalContext } from '../../contexts/GlobalContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import { openContent } from '../../utils/functions'

import UpdatePlaceModal from '../modals/UpdatePlaceModal'
import deleteButton from '../../assets/icons/trashcan-svgrepo-com.svg'
import updateButton from '../../assets/icons/pencil-svgrepo-com.svg'

function AdminPlaces() {

  const {places, subcategories, setPlaces, token} = useContext(GlobalContext)

  const{register, handleSubmit} = useForm()
  


   const onSubmit = async (data)=>{
    const formatedData={
      ...data,
      token : token,
    }
    const response = await API_FUNCTIONS.addPlace(formatedData)
    setPlaces(prev => [...prev, response.data])
    document.getElementById('newPlaceForm').reset()
   }

  const deleteSub = async (id) => {
    API_FUNCTIONS.deletePlace(id, token)
    .then(setPlaces(prev=>prev.filter(item => item.id !== id)))
  }


  return (
    <div className='adminContent'>
      <h2>Lieux</h2>
      <h3>Ajouter un lieu</h3>

      <form onSubmit={handleSubmit(onSubmit)} id='newPlaceForm' className='adminForm'>
        <label>Nom</label>
        <input type='text' {...register('place_name')} required/>
        
        <label>Description</label>
        <textarea {...register('place_description')} required></textarea>

        <label>Catégorie</label>
        <select {...register('subcategory_id')}>
          {subcategories.filter(subcategory => subcategory.category_id === 1).map((subcategory, index) => (
            <option key={index} value={subcategory.id} >{subcategory.subcategory_name}</option>
          ))}
        </select>
        
        <label>Latitude</label>
        <input type="number" min="-90" max="90" step='0.00000000000000001' {...register('place_lat')} required/>

        <label>Longitude</label>
        <input type="number" min="-180" max="180" step='0.00000000000000001'{...register('place_long')} required/>

        <button type='submit'>Créer</button>
      </form>

      <h3>Liste des lieux</h3>
      <div className='adminCardContainer'>
        {places.map((place, index)=>(
          <div key={index} className='singleCard'>
            <div className='adminCard__btnContainer'>
              <button onClick={() => openContent('updatePlaceModal'+place.id)} className='adminCard__btnContainer__button'>
                <img src={updateButton} alt='Modifier' className='adminCard__btnContainer__icon'/>
              </button>
              <button onClick={() => deleteSub(place.id)} className='adminCard__btnContainer__button'>
                <img src={deleteButton} alt='supprimer' className='adminCard__btnContainer__icon'/>
              </button>
            </div>
            
            {place.place_name}
            
            <UpdatePlaceModal place={place}/>
          </div>
        ))}
      </div>
        
        
        
      

    </div>
  )
}

export default AdminPlaces