import React from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import  {Toaster} from "react-hot-toast"
import AddContact from './pages/AddContact'
import Contacts from './pages/Contacts'

const App = () => {
  return (
    <Router>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/add' element={<AddContact/>}/>
        <Route path='/contacts' element={<Contacts/>}/>
      </Routes>
    </Router>
  )
}

export default App