import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  IoMdSearch } from 'react-icons/io';
import {  BiPlus } from 'react-icons/bi';
// import { Fetchuser } from '../utilss/Fetchuser';

const Navbar = ({ user, searchTerm, setSearchTerm }) => {

    const navigate = useNavigate();
    // if(!user) return null;
    
    // const userval =Fetchuser()

    return (
        <>
            <div className='flex items-center bg-transparent z-20  md:gap-5 w-full mt-5 mb-7'>
                <div className='flex z-20 overflow-hidden w-full mw:h-[45px] h-[40px] rounded-2xl  justify-tart items-center px-2  dark:bg-gray-900 outline-1 dark:outline-gray-800 mr-3  bg-gray-200 shadow-md border-none outline-none focus-within:shadow-lg'>
                    <IoMdSearch fontSize={21} className="
                     w-10 bg-gray-200 mr-1 dark:bg-gray-900 " />
                    <input 
                    className='p-2 w-full -mr-[0.5rem] h-[50px] border-l-1 border-white bg-transparent focus dark:bg-black outline-none' 
                    type='text' onChange={(e)=>setSearchTerm(e.target.value)} 
                    value={searchTerm}
                    placeholder='Search...' 
                    onFocus={()=> navigate('/search')}/>
                </div>
                {/* {console.log(user)} */}
                <div className='flex gap-3 z-20'>
                {
                    user ? (
                        <>
                        <div className='flex gap-2 items-center'>
                        <Link onClick={()=>{ document.title = `SHARE WITH US - ${user?.userName}`}} to={`user-profile/${user?._id}`} className='hidden md:flex'>
                        <img src={user.image} alt='user' className='w-10 h-10 rounded-3xl border-solid border-1 mr-3 border-white hover:shadow-lg'/>
                       </Link>
                       <Link to='create-pin' onClick={()=>{ document.title = `SHARE WITH US - Create new post`}} className='bg-black dark:bg-transparent  text-white rounded-lg w-10 h-10  flex justify-center items-center text-[20px]'>
                        <BiPlus fontSize={30} className=' dark:bg-blue-700 rounded-md'/>
                       </Link>
                        </div>
                        </>
                    ):(
                        <>
                        <button onClick={()=> navigate('/login')} className=" hidden md:flex  mw:flex btnsingnin"><strong className='bg-transparent'>SignIn</strong></button>
                        </>
                    )
                }
                </div>
            </div>
        </>
    )
}

export default Navbar;