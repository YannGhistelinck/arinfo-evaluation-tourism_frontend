import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import './assets/sass/main.sass'

//PAGES
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Places from "./pages/Places";
import Place from "./pages/Place";


//COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer"
import AdminHeader from "./components/AdminHeader";
import Submenu from "./components/Submenu";

//FILES
import {GlobalContext} from './contexts/GlobalContext'
import { API_FUNCTIONS } from "./utils/apiFunctions";

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  const [token, setToken] = useState("")
  const [url, setUrl] = useState("/")
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState([])
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [places, setPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState(null)
 

  const isConnected = async(data) => {
    if(data === null){
        setIsAdmin(false)
    }else{
      try{
        const response = await API_FUNCTIONS.currentUser(data)
        if(response.data && response.data.user){
          setUser(response.data.user)
          setIsAdmin(true)
        }else if(response.response && response.response.status===401){
          setIsAdmin(false)
          localStorage.removeItem('token')
        } 
      }catch(e){
          console.error(e)
      }
    }
  }

  const loadData = async() => {
    try{
      const [
        categoriesData,
        subcategoriesData,
        placesData,
      ] = await Promise.all([
        API_FUNCTIONS.allCategories(),
        API_FUNCTIONS.allSubcategories(),
        API_FUNCTIONS.allPlaces(),
      ])

      setCategories(categoriesData)
      setSubcategories(subcategoriesData)
      setPlaces(placesData.data)
    }catch(errors){
      console.error(errors)
    }finally{
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    isConnected(localStorage.getItem('token'))
    setToken(localStorage.getItem('token'))
    loadData()
    
  }, []) 


  return (
    <GlobalContext.Provider value={{token, setToken, setUrl, user, setUser, isAdmin, setIsAdmin, url, categories, setCategories, subcategories, setSubcategories, places, setPlaces, selectedPlace, setSelectedPlace}}>
      {
        isLoaded ? 
        <Router>
        {isAdmin ? <AdminHeader/> : null}
        { url !== "admin" ? <Header/> : null}
        { url !== "admin" ? <Submenu/> : null}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/lieux" element={<Places/>} />
          <Route path="/lieu" element={<Place/>} />
          <Route path="/admin/*" element={<Admin/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/*" element={<Home/>} />
        </Routes>

        {url !== "admin" ? <Footer/> : null}

      </Router>
      :
      null
      }
      
    </GlobalContext.Provider>
  )
}

export default App;
