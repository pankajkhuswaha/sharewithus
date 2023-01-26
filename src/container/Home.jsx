import React from 'react';
import { useState, useRef, useEffect,} from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';
import { AboutUs, Sidebar, UserProfile } from '../components';
import { client } from '../Client';
import logo_light from '../assests/logo-white.png';
import logo_dark from '../assests/logo-black.png';import Pins from './Pins';
import { userQuery } from '../utilss/data'
import { Fetchuser } from '../utilss/Fetchuser';
import { NoInternet, NoInternetBar } from '../components/no-internet';

const Home = () => {
  const [toggleSidebar, setTogglesidebar] = useState(false);
  const [noConnection, setNoConnection] = useState(false);
  const [about, setAbout] = useState(false)


  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = Fetchuser();
  const navigate = useNavigate();

  setTimeout(() => {
    setAbout(true)
  }, 90000);

  useEffect(() => {
    const query = userQuery(userInfo?.sub);


    client
    .fetch(query)
    .then((data) => {
        setUser(data[0]);

      })
  }, []);
  // console.log(user)
  // const navigate = useNavigate()

  // console.log(noConnection)
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  }, [])
  return (
    <div className='flex bg-gray-50 pattern hide_scroll z-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden z-50 md:flex h-screen flex-intial'>
        <Sidebar user={user && user} />
      </div>
      <div className='flex md:hidden flex-row bg-[#00000042] dark:bg-[#1154fa26]'>
        <div className='p-2 w-full flex flex-row z-40 justify-between items-center shadow-md'>
          <HiMenu className='cursor-pointer dark:bg-blue-900- ' fontSize={40} onClick={() => setTogglesidebar(true)} />
          <Link to='/'>
          <picture className='bg-[#1e3a8a]'>
            <source srcSet={logo_dark} onClick={()=>navigate('/')}   media='(prefers-color-scheme: dark)'/>
            <img src={logo_light}  onClick={()=>navigate('/')}  className=" w-[8rem]  dark:bg-blue-900- dark:-mt-0" alt='logo' />

          </picture>
          </Link>
          {userInfo ? (
            <>
              <Link className='bg-transparent pr-4' to={`user-profile/${user?._id}`}>
                <div className='flex flex-col w-12 h-12 justify-center bg-transparent items-center '>
                  <img src={user?.image} referrerPolicy="no-referrer" alt="" className='border-wheat border-2 rounded-3xl' />
                </div>
              </Link>
            </>) : (
            <>
              
                <div onClick={()=> navigate('login')} className='flex pr-4 flex-col bg-transparent dark:bg-blue-900  justify-center items-center '>
                  <button className='p-2  rounded-lg text-white bg-blue-500 cursor-pointer'>SignIn</button>
                </div>
              
            </>)}
        </div>
        {
          toggleSidebar && (
            <>
              <div className='fixed w-4/5 z-50 bg-white dark:bg-gray-400 h-screen overflow-y-auto shadow-md animate-slide-in'>
                <div className='absolute w-full flex justify-end dark:bg-transparent item-center p-2'>
                  <AiFillCloseCircle fontSize={30} className="cursor-pointer dark:bg-transparent" onClick={() => setTogglesidebar(false)} />
                </div>
                <Sidebar user={user && user} closeToggle={setTogglesidebar} />
              </div>
            </>
          )
        }


      </div>
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins setNoConnection={setNoConnection} noConnection={noConnection} user={user && user} />} />
          <Route path='/about' element={ <AboutUs />} />

        </Routes>
      </div>
      {
        about && (<div  className='fixed bottom-0 w-full text-center text-white right-0  bg-blue-700 p-1'>
        Copyright@pankajkumar 2022 | <Link to='/about' className='underline'>Learn More</Link>
      </div>)
      }
      {noConnection && (
      <>
        <NoInternet/>
        <NoInternetBar />
      </>
    )}
      
    </div>
  )
}

export default Home;