import React, {useContext} from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { listenEscapeKey, closeContent, clickOutModal } from '../../utils/functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {useForm} from 'react-hook-form'

import { GlobalContext } from '../../contexts/GlobalContext';
import cross from '../../assets/icons/cross.svg'


function SearchModal() {
    const navigate = useNavigate()

    const {setSearch} = useContext(GlobalContext)

    const{register, handleSubmit} = useForm()

    const searchSubmit = (data) =>  {
        setSearch(data.search)
        document.getElementById('searchForm').reset()
        closeContent('searchModal')
        navigate('/recherche')
    }

    listenEscapeKey('searchModal')

  return (
    <div className='searchModal' id='searchModal' onClick={(e) => clickOutModal(e, 'searchModal')}>
        <div className='searchModal__content'> 
            <FontAwesomeIcon icon={faXmark} alt="fermer" onClick={() => closeContent('searchModal')}className='searchModal__closeButton'/>

            <form onSubmit={handleSubmit(searchSubmit)} id='searchForm'>
                <label className='searchModal__label'>Rechercher</label>
                <input required type="text" {...register('search')} className='searchModal__input'/>
                <button className='searchModal__submit'><FontAwesomeIcon icon={faMagnifyingGlass} className='searchModal__submit__icon'/></button>
            </form>
            <Link to='/recherche-interactive' className='searchModal__interactive' onClick={() => closeContent('searchModal')}>Recherche Interactive</Link>
            
        </div>
    </div>
  )
}

export default SearchModal