import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Payment from './payment'
import Transaction from './transaction'
import Success from './sucess'
import Failure from './failure'
import NavBar from './Navbar'

const First = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Payment/>}/>
        <Route path='/transaction' element={<Transaction/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/cancel' element={<Failure/>}/>
        <Route path='/navbar' element={<NavBar/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default First