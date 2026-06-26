import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <>
      <div>
        <Routes>
        <Route path='/' element={<Root />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/dashboard' element={<Home />}/>
        <Route path='/income' element={<Income />}/>
        <Route path='/expense' element={<Expense />}/>
      </Routes>
      </div>

      <Toaster toastOptions={{
        className: "",
        style: {
          fontSize: "13px"
        }
      }}/>
    </>
  )
}

const Root = () => {
  //checks if token exists in local storage
  const isAuthenticated = !!localStorage.getItem('token')

  //Redirect to dashboard page if exists else to login
  return isAuthenticated ? (
    <Navigate to='/dashboard' />
  ) : (
    <Navigate to='/login' />
  )
}

export default App