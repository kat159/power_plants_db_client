import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import HomeIntro from './HomeIntro';
import DBcontent from './DBcontent';

export default function Middle() {
  return (
    <Routes>
      <Route path='/' element={HomeIntro()} />
      <Route path='/db/*' element={DBcontent()} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
