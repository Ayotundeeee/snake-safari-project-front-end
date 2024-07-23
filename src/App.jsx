import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Edit from './pages/Edit'
import Navbar from './components/Navbar'
import NotFound from './pages/NotFound'
import Show from './pages/Show'
import Index from './pages/Index'
import New from './pages/New'

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/snakes" element={<Index />} />
        <Route path="/snakes/:id" element={<Show />} />
        <Route path="/snakes/:id/edit" element={<Edit />} />
        <Route path="/new" element={<New />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
