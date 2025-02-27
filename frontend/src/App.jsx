import React from 'react'
import Signup from './Signup'
import Login from './Login'
import Home from './Home'
import Content from './Content'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/content' element={<Content />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App