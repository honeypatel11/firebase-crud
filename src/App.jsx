
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Books from './pages/Books'
import SignUp from './pages/signup'


const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Signin />} />
        
        <Route path='/books' element={<Books />} />
        <Route path='/sign-up' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>


  )
}

export default App