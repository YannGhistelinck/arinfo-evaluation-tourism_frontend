import React, {useContext} from 'react'
import { Link } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'



function Footer() {

  const {categories, subcategories} = useContext(GlobalContext)

  return (
    <footer className='footer'>
      <div className='footer__container'>


        <div className='footer__container__infos'>
          {
            categories.map((category, index) => (
              <div key={index} className='footer__container__infos__bloc'>
                <Link><h2>{category.category_name}</h2></Link>
                  {
                    subcategories.filter(subcategory => subcategory.category_id === category.id).map((subcategory, index) => (
                      <Link key={index}>{subcategory.subcategory_name}</Link>
                    ))
                  }
              </div>
            ))
          }
        </div>


        <div className='footer__container__legal'>
          <Link>Mentions Légales</Link> - 
          <Link to='/login'>Espace Administrateurs</Link>
        </div>


      </div>

    </footer>
  )
}

export default Footer