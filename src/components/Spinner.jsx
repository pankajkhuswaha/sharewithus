import React from 'react';
import HashLoader from 'react-spinners/HashLoader'

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
    <HashLoader
    color='#00BFFF'
    size={30}
    className='m-5'
     />
    <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner;