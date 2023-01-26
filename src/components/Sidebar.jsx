import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AiTwotoneHome } from 'react-icons/ai';
// import { IoIosArrowForward } from 'react-icons/io';
import logo_light from '../assests/logo-white.png';
import logo_dark from '../assests/logo-black.png';
import { FaUser } from 'react-icons/fa';
import { categories } from '../utilss/data';
// import NetworkDetector from '../utilss/Networkconfig';

//  const logo_dark='../assests/logo-black.png'


const isNotActiveStyle = 'flex -p-2 items-center dark:bg-gray-900 px-5 gap-3 text-gray-500 p-0 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-200-ease-in-out capitalize';
const isActiveStyle = 'flex bg-gray-200 items-center px-5 gap-2  dark:bg-gray-800 font-extrabold border-r-2 border-black transition-all duration-200-ease-in-out capitalize dark:text-white dark:border-white '


const Sidebar = ({ user, closeToggle }) => {
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false)
  }
  const navigate = useNavigate();
  // console.log(user)
  return (
    <div className='flex flex-col z-[60px] justify-between bg-gray-100 dark:shadow-lg dark:bg-gray-900 overflow-y-scroll h-full min-w-[210px] hide_scroll'>
      <div className='flex flex-col dark:bg-gray-900'>
        <Link to='/' onClick={()=>{
          handleCloseSidebar();
          navigate('/');
        }} className='flex dark:bg-gray-900 px-2 pr-3 gap-2 dark:p-0  my-[12px] pt-1 w-[210px] items-center'>
        <picture className='dark:bg-transparent mx-2 h-10'>
            <source className='' onClick={()=>navigate('/')} srcSet={logo_dark}  media='(prefers-color-scheme:dark)'/>
            <img src={logo_light} className=" w-[190px] dark:my-2 bg-transparent " alt='logo' />

          </picture>
        </Link>
        <div className='flex flex-col mw:gap-5 gap-2 dark:bg-gray-900'>
          <NavLink
            to='/'
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            <AiTwotoneHome className='bg-transparent my-3' />
            Home
          </NavLink>
          <h3 className='px-5 dark:bg-transparent dark:text-white text-base 2xl:text:xl text-bold'>Discover Categories :</h3>
          {
            categories.slice(0,categories.length-1).map((category,index) => 
            <div key={index}>
            <NavLink 
                to={`/category/${category?.name}`}
                className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}
                key={index}
                onClick={()=>{
                  handleCloseSidebar()
                  document.title = `SHARE WITH US -  ${category?.name}`
                }}
              >
              <div className='h-12 w-12 border-2 border-black border-solid overflow-hidden rounded-full '>
              <img src={category.image} referrerPolicy="no-referrer"  alt='' className='  '/>
              </div>
              {category.name}
              </NavLink>
            </div>
            )
          }
        </div>
      </div>
      {
        user && (
          <Link to={`user-profile/${user._id}`} className=" flex my-5 mb-7 gap-2 p-2 items-center bg-white dark:bg-gray-800 rounded-lg mx-3 shadow-lg" onClick={handleCloseSidebar}>
            <img src={user.image} className='w-8 h-8 rounded-full' alt='user' />
            <p className='dark:bg-transparent'>{user.userName}</p>
            {/* {console.log("iam iside user")} */}
          </Link>
        )
        }
        {!user && (
          <>
          <div className=" flex my-5 mb-7 gap-2 p-2 items-center bg-white dark:bg-gray-800 rounded-lg mx-3 shadow-lg" onClick={handleCloseSidebar}>
            <FaUser className='w-8 h-8 rounded-full' />
            <p className='dark:bg-transparent'>Guest</p>
            {/* <NetworkDetector /> */}
            {/* {console.log("iam iside user")} */}
          </div>
          </>
        )}
    </div>
  )
}

export default Sidebar;