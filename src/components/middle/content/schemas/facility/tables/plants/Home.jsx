import React from 'react'
import DataTable from './DataTable'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Insert from './Insert'
import { Button, Space } from 'antd'
import EditableDemo from './EditableDemo'
import Update from './Update'

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
