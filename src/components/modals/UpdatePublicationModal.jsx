import React, {useContext, useState} from 'react'
import { closeContent, clickOutModal, listenEscapeKey } from '../../utils/functions'
import {useForm} from 'react-hook-form' 

import { GlobalContext } from '../../contexts/GlobalContext'
import { AdminContext } from '../../contexts/AdminContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import cross from '../../assets/icons/cross.svg'
import { API_STORAGE } from '../../utils/apiFunctions'


function UpdatePublicationModal({publication, publicationImages}) {

    const {places, categories, subcategories, token} = useContext(GlobalContext)
    const {publications, setPublications, setImages, images} = useContext(AdminContext)

    const [currentPublication, setCurrentPublication] = useState(publication)
    const [currentImages, setCurrentImages] = useState(publicationImages)

    const{register, handleSubmit} = useForm()

    const updatePublication = async(data)=> {
        const formatedData={
          ...data,
          token: token,
          id:publication.id,
        }
        API_FUNCTIONS.updatePublication(formatedData)
        .then(res => {
          const updatedPublications = publications.map(p => (
            p.id === res.data.id ?
                res.data
            :
                p
        ) )
        setPublications(updatedPublications)
        closeContent('updatePublicationModal'+publication.id)
        })
      }


    const sendImage = async (e, id)=>{
        
        const formData = new FormData()
        formData.append('image_name', e.target.files[0])
        formData.append('publication_id', id)

        await API_FUNCTIONS.addImage(formData, token)
        .then(res => {
            document.getElementById('imgInput').value = ''
            setCurrentImages(prev => [...prev, res.data.data])
            setImages(prev => [...prev, res.data.data])
            console.log("current", res.data.data)
            console.log('images ', images)
        })
    }
    
    const deleteImg = async(id)=>{
        await API_FUNCTIONS.deleteImage(id, token)
        .then(
            setCurrentImages(prev=>prev.filter(item => item.id !== id)),
            setImages(prev=>prev.filter(item => item.id !== id))
        )
    }

  listenEscapeKey('updatePublicationModal'+publication.id)


  return (
    <div className='modal' id={'updatePublicationModal'+publication.id} onClick={(e) => clickOutModal(e, 'updatePublicationModal'+publication.id)}>
        <div className='modal__content'> 
            <button onClick={() => closeContent('updatePublicationModal'+publication.id)} className='modal__closeButton'><img src={cross} alt="fermer" className='modal__closeImg'/></button>
           
            <form onSubmit={handleSubmit(updatePublication)} id='updatePublicationForm' className='adminForm'>
                <label>Nom</label>
                <input type="text" value={currentPublication.publication_name} {...register('publication_name')} onChange={e => setCurrentPublication(prev => ({...prev, publication_name : e.target.value}))}/>

                <label>Description</label>
                <input type='text' value={currentPublication.publication_description} {...register('publication_description')} required onChange={e => setCurrentPublication(prev => ({...prev, publication_description : e.target.value}))}/>
                
                {/* <label>Catégorie</label>
                <select {...register('category_id')} value={currentPublication.category_id} onChange={e => setCurrentPublication(prev => ({...prev, category_id : e.target.value}))}>
                {categories.map((category, index)=> (
                    <option key={index} value={category.id}>{category.category_name}</option>
                ))}
                </select> */}


                
                <label>Lieu</label>
                <select {...register('place_id')} value={currentPublication.place_id} onChange={e => setCurrentPublication(prev => ({...prev, place_id : e.target.value}))} >
                {places.map((place, index) => (
                    <option key={index} value={place.id} >{place.place_name}</option>
                ))}
                </select>



                <label>Sous-catégorie</label>
                <select {...register('subcategory_id')} value={currentPublication.subcategory_id} onChange={e => setCurrentPublication(prev => ({...prev, subcategory_id : e.target.value}))} >
                {subcategories.map((subcategory, index) => (
                    subcategory.category_id === parseInt(currentPublication.category_id) && <option key={index} value={subcategory.id} >{subcategory.subcategory_name}</option>
                ))}
                </select>

                
                
                {
                    currentImages.length > 0 ? 
                    <div className='adminMiniatureContainer'>
                        {currentImages.map((image, index) => (
                            <div className='adminMiniatureContainer__bloc' key={index}>
                                <div className='redTrash' onClick={() => {deleteImg(image.id)}}></div>
                                <img src={API_STORAGE+image.image_name} alt={image.image_name} className='adminMiniatureContainer__img'/>
                            </div>
                        ))}
                    </div>
                    :
                    <div>
                        Pas encore d'images
                    </div>
                }
                
                <input type="file" onChange={e => {if(e)sendImage(e, publication.id)}} id='imgInput'/>


                <button type="submit">Modifier</button>
            </form>

        </div>
    </div>
  )
}

export default UpdatePublicationModal