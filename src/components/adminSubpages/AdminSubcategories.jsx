import React, {useContext} from 'react'
import {useForm} from 'react-hook-form'

import { GlobalContext } from '../../contexts/GlobalContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import { openContent } from '../../utils/functions'

import UpdateSubcategoryModal from '../modals/UpdateSubcategoryModal'
import deleteButton from '../../assets/icons/trashcan-svgrepo-com.svg'
import updateButton from '../../assets/icons/pencil-svgrepo-com.svg'

function AdminSubcategories() {
  const {categories, subcategories, setSubcategories, token} = useContext(GlobalContext)

  const{register, handleSubmit} = useForm()
  


   const onSubmit = async (data)=>{
    const formatedData={
      ...data,
      token : token,
    }
    const response = await API_FUNCTIONS.addSubcategory(formatedData)
    setSubcategories(prev => [...prev, response.data])
    document.getElementById('newSubcategoryForm').reset()
   }

  const deleteSub = async (id) => {
    API_FUNCTIONS.deleteSubcategory(id, token)
    .then(setSubcategories(prev=>prev.filter(item => item.id !== id)))
  }
  

  return (
    <div className='adminContent'>
      <h2>Sous-catégories</h2>




      <h3>Ajouter une sous-catégorie</h3>
      <form onSubmit={handleSubmit(onSubmit)} id='newSubcategoryForm' className='adminForm'>

        <label>nom de la catégorie</label>
        <input type='text' {...register('subcategory_name')} required/>



        <label>Catégorie</label>
        <select {...register('category_id')}>
          {categories.map((category, index) => (
            <option value={category.id} key={index}>{category.category_name}</option>
          ))}
        </select>

        <button type='submit'>Créer</button>
      </form>





      <h3>Toutes les sous-catégories</h3>
      <div className='adminCardContainer'>
        {subcategories.map((subcategory, index)=>(
          <div key={index} className='singleCard'>
            <div className='adminCard__btnContainer'>
              <button onClick={() => openContent('updateSubcategoryModal'+subcategory.id)} className='adminCard__btnContainer__button'>
                <img src={updateButton} alt='Modifier' className='adminCard__btnContainer__icon'/>
              </button>
              <button onClick={() => deleteSub(subcategory.id)} className='adminCard__btnContainer__button'>
                <img src={deleteButton} alt='supprimer' className='adminCard__btnContainer__icon'/>
              </button>
            </div>
            
            {subcategory.subcategory_name}
            
            <UpdateSubcategoryModal subcategory={subcategory}/>
          </div>
        ))}
      </div>
        
        
        
      

    </div>
  )
}

export default AdminSubcategories