import React from 'react';
import { useState } from 'react';
import {  useNavigate, Route ,Routes} from 'react-router-dom';
import { Navbar,Feed,PinDetails,CreatePin,Search } from '../components';

const Pins = ({user ,setNoConnection,noConnection}) => {
  const [searchTerm,setSearchTerm] =useState('')
  const navigate = useNavigate()
  // console.log(noConnection)
  return (
    <div className='px-2 md:px-5 hide_scroll'>
    <div className='bg-transparent'>
    <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
    </div>
    <div className='h-full'> 
    <Routes>
      <Route path='/'  element={<Feed  noConnection={noConnection}  setNoConnection={setNoConnection} />} />
      <Route path="/category/:categoryId" element={<Feed  noConnection={noConnection}  setNoConnection={setNoConnection} />} />
      <Route path="pin-detail/:pinId" element={<PinDetails onClick={()=> navigate('/')} user={user}/>} />
      <Route path='/create-pin' element={<CreatePin user={user}/>} />
      <Route path='/search' element={<Search  noConnection={noConnection}  setNoConnection={setNoConnection}  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>} />
    </Routes>
    </div>
    </div>
  )
}

export default Pins;