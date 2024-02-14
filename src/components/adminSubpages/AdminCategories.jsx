import React, {useContext} from 'react'
import {useForm} from 'react-hook-form'

import { GlobalContext } from '../../contexts/GlobalContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import { openContent } from '../../utils/functions'

import UpdateCategoryModal from '../modals/UpdateCategoryModal'
import deleteButton from '../../assets/icons/trashcan-svgrepo-com.svg'
import updateButton from '../../assets/icons/pencil-svgrepo-com.svg'

function AdminCategories() {
  const {categories, setCategories, token} = useContext(GlobalContext)

  const{register, handleSubmit} = useForm()
  


   const onSubmit = async (data)=>{
    const formatedData={
      ...data,
      token : token,
    }
    const response = await API_FUNCTIONS.addCategory(formatedData)
    setCategories(prev => [...prev, response.data])
    document.getElementById('newCategoryForm').reset()
   }

  const deleteCat = async (id) => {
    API_FUNCTIONS.deleteCategory(id, token)
    .then(setCategories(prev=>prev.filter(item => item.id !== id)))
  }
  

  return (
    <div className='adminContent'>
      <h2>Catégories</h2>
      <h3>Ajouter une catégorie</h3>
      <form onSubmit={handleSubmit(onSubmit)} id='newCategoryForm' className='adminForm'>
        <label>nom de la catégorie</label>
        <input type='text' {...register('category_name')} required/>

        <button type='submit'>Créer</button>
      </form>

      <h3>Toutes les catégories</h3>
      <div className='adminCardContainer'>
        {categories.map((category, index)=>(
          <div key={index} className='singleCard'>
            <div className='adminCard__btnContainer'>
              <button onClick={() => openContent('updateCategoryModal'+category.id)} className='adminCard__btnContainer__button'>
                <img src={updateButton} alt='Modifier' className='adminCard__btnContainer__icon'/>
              </button>
              <button onClick={() => deleteCat(category.id)} className='adminCard__btnContainer__button'>
                <img src={deleteButton} alt='supprimer' className='adminCard__btnContainer__icon'/>
              </button>
            </div>
            
            {category.category_name}
            
            <UpdateCategoryModal category={category}/>
          </div>
        ))}
      </div>
        
        
        
      

    </div>
  )
}

export default AdminCategories