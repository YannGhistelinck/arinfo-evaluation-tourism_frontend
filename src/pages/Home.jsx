import React, {useContext} from 'react'

import { GlobalContext } from '../contexts/GlobalContext'

function Home() {
    const {setUrl} = useContext(GlobalContext)
    setUrl('/')
    
  return (
    <div>
        Home

    </div>
  )
}

export default Home