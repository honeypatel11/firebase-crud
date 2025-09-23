import React from 'react'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/signup'
import Books from './pages/Books'

const App = () => {
  return (
   <BrowserRouter>
   
   <Routes>
    <Route path='/' element={<Signin/>} />
    <Route path='/sign-up' element={<Signup/>}/>
    <Route path='/books' element={<Books/>} />
   </Routes>
   </BrowserRouter>

    
  )
}

export default App