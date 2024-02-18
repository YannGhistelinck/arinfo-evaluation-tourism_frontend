import React, {useContext, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'

import { GlobalContext } from '../../contexts/GlobalContext'
import { AdminContext } from '../../contexts/AdminContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import { openContent } from '../../utils/functions'
import { API_STORAGE } from '../../utils/apiFunctions'

import UpdatePublicationModal from '../modals/UpdatePublicationModal'
import deleteButton from '../../assets/icons/trashcan-svgrepo-com.svg'
import updateButton from '../../assets/icons/pencil-svgrepo-com.svg'
import closedTrash from '../../assets/icons/red-delete-trash-closed.svg'

function AdminPublications() {
  const {categories, subcategories, places, token, user} = useContext(GlobalContext)
  const {publications, setPublications, images, setImages} = useContext(AdminContext)

  const [isLoaded, setIsloaded] = useState(false)
  
  const [currentCategory, setCurrentCategory] = useState(1)

  const{register, handleSubmit} = useForm()
  


   const onSubmit = async (data)=>{
    const formatedData={
      ...data,
      token : token,
      user_id: user.id
    }
    const response = await API_FUNCTIONS.addPublication(formatedData)
    setPublications(prev => [...prev, response.data])
    document.getElementById('newPublicationForm').reset()
   }

  const deletePublication = async (id) => {
    API_FUNCTIONS.deletePublication(id, token)
    .then(setPublications(prev=>prev.filter(item => item.id !== id)))
  }

  const loadData = async()=>{
    try{
      const query = {
      }
      const [
        publicationsData,
        // imagesData,
      ] = await Promise.all([
        API_FUNCTIONS.allPublications(query),
        // API_FUNCTIONS.allImages(),
      ])
      setPublications(publicationsData.data)
      // setImages(imagesData)
      setImages(publicationsData.images)
    }catch(e){
      console.error(e)
    }finally{
      setIsloaded(true)
    }
  }
  useEffect(() => {
    loadData()
  }, [])

  const changeStatus = async(data, status_id)=>{
    const newPublication  = {...data, status_id : status_id}
    const formatedData = {
      ...newPublication,
      token: token
    }
    await API_FUNCTIONS.updatePublication(formatedData)
    .then(res => {
      const updatedPublications = publications.map(p => (
        p.id === res.data.id ?
            res.data
        :
            p
    ) )
    setPublications(updatedPublications)
    })
    
  }
  const deleteImg = async(id)=>{
    await API_FUNCTIONS.deleteImage(id, token)
    .then(setImages(prev=>prev.filter(item => item.id !== id)))
  }

  return (
    <div className='adminContent'>
      <h2>Publications</h2>
      <h3>Ajouter une catégorie</h3>
      <form onSubmit={handleSubmit(onSubmit)} id='newPublicationForm' className='adminForm'>
        <label>Nom</label>
        <input type='text' {...register('publication_name')} required/>
        
        <label>Description</label>
        <input type='text' {...register('publication_description')} required/>
        
        {/* <label>Catégorie</label>
        <select {...register('category_id')} onChange={e => setCurrentCategory(e.target.value)}>
          {categories.map((category, index)=> (
            <option key={index} value={category.id}>{category.category_name}</option>
          ))}
        </select> */}

        <label>Lieu</label>
        <select {...register('place_id')}>
          {places.map((place, index) => (
            <option key={index} value={place.id} >{place.place_name}</option>
          ))}
        </select>

        <label>Catégorie</label>
        <select {...register('subcategory_id')}>
          {subcategories.filter(subcategory => subcategory.category_id === 2).map((subcategory, index) => (
            <option key={index} value={subcategory.id} >{subcategory.subcategory_name}</option>
          ))}
        </select>

        

        

        <button type='submit'>Créer un brouillon</button>
      </form>

      <h3>Toutes les catégories</h3>
      {
        isLoaded ? 
          <div className='adminCardContainer'>
            {publications.map((publication, index)=>(
              <div key={index} className='singleCard'>
                <div className='adminCard__btnContainer'>
                  <button onClick={() => openContent('updatePublicationModal'+publication.id)} className='adminCard__btnContainer__button'>
                    <img src={updateButton} alt='Modifier' className='adminCard__btnContainer__icon'/>
                  </button>
                  <button onClick={() => deletePublication(publication.id)} className='adminCard__btnContainer__button'>
                    <img src={deleteButton} alt='supprimer' className='adminCard__btnContainer__icon'/>
                  </button>
                </div>
                {publication.status_id === 1 ? 
                <div>
                  <p>Brouillon</p> 
                  <button onClick={() => changeStatus(publication, 2)}>Publier la publication</button>
                </div>
                : 
                <div>
                  <p>Publié</p>
                  <button onClick={() => changeStatus(publication, 1)}>Retirer la publication</button>
                </div>
                }
                <h4>{publication.publication_name}</h4>
                
                <p>{publication.publication_description}</p>
                <div className='adminMiniatureContainer'>
                  {
                    images.filter(image => image.publication_id === publication.id).length > 0 ? 
                    images.filter(image => image.publication_id === publication.id).map((image, index) => 
                      <div className='adminMiniatureContainer__bloc' key={index}>
                        <div className='redTrash' onClick={() => {deleteImg(image.id)}}></div>
                        <img src={API_STORAGE+image.image_name} alt={image.image_name} className='adminMiniatureContainer__img'/>
                      </div>
                    )
                    :
                    <p>pas encore d'images</p>
                  }
                </div>
                
                
                <UpdatePublicationModal publication={publication} publicationImages={images.filter(image => image.publication_id === publication.id)}/>
              </div>
            ))}
            
          </div>
          :
          <p>Chargement...</p>
      }
      
        
        
        
      

    </div>
  )
}

export default AdminPublications