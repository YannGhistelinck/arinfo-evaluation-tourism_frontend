import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { openContent } from '../utils/functions'

import SearchModal from './modals/SearchModal';

function HeaderToolbar() {
  return (
    <div className='toolbar'>
      <FontAwesomeIcon icon={faMagnifyingGlass} className='toolbar__search' onClick={() => openContent('searchModal')}/>
      <Link to='/recherche-interactive' className='toolbar__link'>Recherche Interactive</Link>
      <SearchModal/>
    </div>
  )
}

export default HeaderToolbar