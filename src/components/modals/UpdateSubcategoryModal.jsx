import React, {useContext, useState} from 'react'
import { closeContent, clickOutModal, listenEscapeKey } from '../../utils/functions'
import {useForm} from 'react-hook-form' 

import { GlobalContext } from '../../contexts/GlobalContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import cross from '../../assets/icons/cross.svg'

function UpdateSubcategoryModal({subcategory}) {
    const {categories,subcategories, setSubcategories, token} = useContext(GlobalContext)

    const [currentSubcategory, setCurrentSubcategory] = useState(subcategory)

    const{register, handleSubmit} = useForm()

    const updateSubcategory = async(data)=> {
        const formatedData={
          ...data,
          token: token,
          id:subcategory.id,
        }
        await API_FUNCTIONS.updateSubcategory(formatedData)
        .then(res => {
          const updatedSubcategories = subcategories.map(cat => (
            cat.id === res.data.id ?
                res.data
            :
                cat
        ) )
        setSubcategories(updatedSubcategories)
        closeContent('updateSubcategoryModal'+subcategory.id)
        })
        
      }
  listenEscapeKey('updateSubcategoryModal'+subcategory.id)
  return (
    <div className='modal' id={'updateSubcategoryModal'+subcategory.id} onClick={(e) => clickOutModal(e, 'updateSubcategoryModal'+subcategory.id)}>
        <div className='modal__content' > 
            <button onClick={() => closeContent('updateSubcategoryModal'+subcategory.id)} className='modal__closeButton'><img src={cross} alt="fermer" className='modal__closeImg'/></button>
           
            <form onSubmit={handleSubmit(updateSubcategory)} id='updateSubcategoryForm' className='adminForm'>
                <label>Nom</label>
                <input type="text" value={currentSubcategory.subcategory_name} {...register('subcategory_name')} onChange={e => setCurrentSubcategory(prev => ({...prev, subcategory_name:e.target.value}))}/>

                <label>Catégorie</label>
                <select {...register('category_id')} value={currentSubcategory.category_id} onChange={e => setCurrentSubcategory(prev => ({...prev, category_id: e.target.value}))}>
                    {categories.map((category, index) => (
                        category.id===subcategory.category_id ?
                            <option key={index} value={category.id} >{category.category_name}</option>
                        :
                            <option key={index} value={category.id} >{category.category_name}</option>
                    ))}
                </select>

                <button type="submit">Modifier</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateSubcategoryModal


