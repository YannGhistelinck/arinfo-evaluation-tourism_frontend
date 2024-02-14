import React, {useContext} from 'react'
import { useForm } from 'react-hook-form'

import { GlobalContext } from '../../contexts/GlobalContext'
import { AdminContext } from '../../contexts/AdminContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import { openContent } from '../../utils/functions'

import deleteButton from '../../assets/icons/trashcan-svgrepo-com.svg'
import updateButton from '../../assets/icons/pencil-svgrepo-com.svg'

import UpdateRedactorModal from '../modals/UpdateRedactorModal'


function AdminRedactors() {
  const {token} = useContext(GlobalContext)
  const {redactors, setRedactors} = useContext(AdminContext)

  const{register, handleSubmit} = useForm()

  const onSubmit = async (data)=>{
    const formatedData= {
      ...data,
      token: token
    }
    const response = await API_FUNCTIONS.register(formatedData)
    setRedactors(prev => [...prev, response])
    document.getElementById('newRedactorForm').reset()
    
      
    
  }

  return (
    <div className='adminContent'>

      <h2>Rédacteurs</h2>

      <h3>Créer un compte rédacteur</h3>
      <form onSubmit={handleSubmit(onSubmit)} id='newRedactorForm' className='adminForm'>
        <label>Prénom</label>
        <input type='text' {...register('firstname')} required/>
        
        <label>Nom</label>
        <input type='text' {...register('lastname')} required/>
        
        <label>email</label>
        <input type='email' {...register('email')} required/>
        
        <label>Mot de passe</label>
        <input type='password' {...register('password')} required/>

        <button type='submit'>Créer</button>
      </form>
      
      <h3>Liste des rédacteurs</h3>
      <div className='adminCardContainer'>
        {redactors.map((redactor, index)=>(
          <div key={index} className='singleCard'>
            <div className='adminCard__btnContainer'>
              <button onClick={() => openContent('updateRedactorModal'+redactor.id)} className='adminCard__btnContainer__button'>
                <img src={updateButton} alt='Modifier' className='adminCard__btnContainer__icon'/>
              </button>
              {/* <button onClick={() => deleteCat(category.id)} className='adminCard__btnContainer__button'>
                <img src={deleteButton} alt='supprimer' className='adminCard__btnContainer__icon'/>
              </button> */}
            </div>
            
            {redactor.firstname}
            
            <UpdateRedactorModal redactor={redactor}/>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AdminRedactors