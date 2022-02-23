import React from 'react'
import DataTable from './DataTable'
import { Routes, Route, } from 'react-router-dom'
import Insert from './Insert'

export default function Home() {
  return (
    <div>
      <Routes>
        <Route path='/' element={DataTable()} />
        <Route path='/insert' element={Insert()} />
      </Routes>    
    </div>
  )
}
