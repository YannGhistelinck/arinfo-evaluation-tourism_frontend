import React, {useContext, useState} from 'react'
import { closeContent, clickOutModal, listenEscapeKey } from '../../utils/functions'
import {useForm} from 'react-hook-form' 


import { GlobalContext } from '../../contexts/GlobalContext'
import { AdminContext } from '../../contexts/AdminContext'
import { API_FUNCTIONS } from '../../utils/apiFunctions'
import cross from '../../assets/icons/cross.svg'

function UpdateRedactorModal({redactor}) {

    const {redactors, setRedactors} = useContext(AdminContext)
    const {token} = useContext(GlobalContext)

    const [currentRedactor, setCurrentRedactor] = useState(redactor)

    const{register, handleSubmit} = useForm()

    const updateRedactor = async(data)=>{
        const formatedData={
            ...data,
            token: token,
            id:redactor.id,
        }
        await API_FUNCTIONS.update
    }


    listenEscapeKey('updateCategoryModal'+redactor.id)

    return (
        <div className='modal' id={'updateRedactorModal'+redactor.id} onClick={(e) => clickOutModal(e, 'updateRedactorModal'+redactor.id)}>
        <div className='modal__content' > 
            <button onClick={() => closeContent('updateRedactorModal'+redactor.id)} className='modal__closeButton'><img src={cross} alt="fermer" className='modal__closeImg'/></button>
           
            <form onSubmit={handleSubmit(updateRedactor)} id='updateCategoryForm' className='adminForm'>
              <label>Prénom</label>
              <input type="text" value={currentRedactor.firstname} {...register('firstname')} onChange={e => setCurrentRedactor(prev =>({...prev, firstname: e.target.value}))}/>
              
              <label>Nom</label>
              <input type="text" value={currentRedactor.lastname} {...register('lastname')} onChange={e => setCurrentRedactor(prev =>({...prev, lastname: e.target.value}))}/>

              <label>Email</label>
              <input type="text" value={currentRedactor.email} {...register('email')} onChange={e => setCurrentRedactor(prev =>({...prev, email: e.target.value}))}/>
              
              
              <button type="submit">Modifier</button>
            </form>
        </div>
    </div>
    )
}

export default UpdateRedactorModal