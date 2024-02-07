import React, {useContext} from 'react'
import {useForm} from 'react-hook-form'

import { GlobalContext } from '../contexts/GlobalContext'
import { API_FUNCTIONS } from '../utils/apiFunctions'

function AdminCategories() {
  const {categories, setCategories, token} = useContext(GlobalContext)

  const{
    register,
    handleSubmit,
   } = useForm()

   const onSubmit = async (data)=>{
    const formatedData={
      ...data,
      token : token,
    }
    const response = await API_FUNCTIONS.addCategory(formatedData)
    setCategories(prev => [...prev, response.data])
    document.getElementById('newCategoryForm')
   }

  return (
    <div className='adminContent'>
      <h2>Catégories</h2>
      <h3>Ajouter une catégorie</h3>
      <form onSubmit={handleSubmit(onSubmit)} id='newCategoryForm'>
        <label>nom de la catégorie</label>
        <input type='text' {...register('category_name')} required/>
        <input type='hidden' {...register('token', token)}/>
        <button type='submit'>Créer</button>
      </form>

      <article>
        <h3>Toutes les catégories</h3>
        {categories.map((category, index)=>(
          <div key={index}>{category.category_name}</div>
        ))}
      </article>
        

    </div>
  )
}

export default AdminCategories