import React, {useContext, useState} from 'react'
import { closeContent, clickOutModal, listenEscapeKey } from '../../utils/functions'
import {useForm} from 'react-hook-form' 

import { GlobalContext } from '../../contexts/GlobalContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import cross from '../../assets/icons/cross.svg'

function UpdateCategoryModal({category}) {
    const {categories, setCategories, token} = useContext(GlobalContext)

    const [currentCategory, setCurrentCategory] = useState(category)

    const{register, handleSubmit} = useForm()

    const updateCat = async(data)=> {
        const formatedData={
          ...data,
          token: token,
          id:category.id,
        }
        API_FUNCTIONS.updateCategory(formatedData)
        .then(res => {
          const updatedCategories = categories.map(cat => (
            cat.id === res.data.id ?
                res.data
            :
                cat
        ) )
        setCategories(updatedCategories)
        closeContent('updateCategoryModal'+category.id)
        })
      }
  listenEscapeKey('updateCategoryModal'+category.id)
  return (
    <div className='modal' id={'updateCategoryModal'+category.id} onClick={(e) => clickOutModal(e, 'updateCategoryModal'+category.id)}>
        <div className='modal__content' > 
            <button onClick={() => closeContent('updateCategoryModal'+category.id)} className='modal__closeButton'><img src={cross} alt="fermer" className='modal__closeImg'/></button>
           
            <form onSubmit={handleSubmit(updateCat)} id='updateCategoryForm' className='adminForm'>
              <label>Nom</label>
              <input type="text" value={currentCategory.category_name} {...register('category_name')} onChange={e => setCurrentCategory(e.target.value)}/>

              <button type="submit">Modifier</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateCategoryModal


