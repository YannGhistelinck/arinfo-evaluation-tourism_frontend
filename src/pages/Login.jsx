import React, {useContext} from 'react'
import {useForm} from 'react-hook-form'
import { API_FUNCTIONS } from '../utils/apiFunctions'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../contexts/GlobalContext'

function Login() {
    const {setToken, setUrl} = useContext(GlobalContext)
    setUrl("admin")
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    if(localStorage.getItem('token')){
        navigate('/admin')
    }

    const onSubmit = async (data) => {
        try{
            const response = await API_FUNCTIONS.login(data)
            setToken(response.data.data.access_token.token)
            localStorage.setItem("token", response.data.data.access_token.token)
            navigate("/admin")
        }catch(error){
            console.error(error)
        }
    }



  return (
    <div className='login'>
        

        <form onSubmit={handleSubmit(onSubmit)} className='login__form'>
            <h2>Connexion à l'espace administrateur</h2>
            <label>Email</label>
            <input type="email" {...register('email')} required />

            <label>Mot de passe</label>
            <input type="password" {...register('password')} required/>

            <button type="submit">Se connecter</button>
        </form>
    </div>
  )
}

export default Login