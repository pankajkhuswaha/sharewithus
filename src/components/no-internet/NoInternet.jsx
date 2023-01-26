import React from 'react';
import internet from '../../assests/internet.png'

const Internet = () => {
  return (
    <>
        <div className='w-full bg-transparent z-30 absolute top-0 bottom-0 right-0 left-0 bg- h-full m-auto '>
            <div className='w-full h-full  flex flex-col bg-transparent justify-center  items-center'>
                <div className='bg-transparent '>
                    <div className='flex bg-transparent flex-col p-4 items-center'>
                       <div className=' w-52 h-52 bg-transparent felx flex-col items-center justify-center '>
                        <img className='bg-transparent ml-5' src={internet} alt='' />
                       </div>
                       <h2 className='bg-transparent'>Connect to the Internet</h2>
                       <p className='bg-transparent'>You're offline. Check your connection.</p>
                       <button onClick={()=>window.location.reload()} className='text-blue  bg-transparent bg-red p-1 rounded-lg mt-2 px-4 outline-none border-2 border-green-600'>Retry</button>
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default Internet;