import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utilss/data';
import { client } from '../Client';
import MasonaryLayout from './MasonaryLayout';
import Spinner from './Spinner';
import { Fetchuser } from '../utilss/Fetchuser';
import { NoInternet } from './no-internet';

const UserProfile = () => {
  const mainuser = Fetchuser()
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created')
  const [reload, setReload] = useState(1)
  const [activeBtn, setActiveBtn] = useState('Created');
  const [nocon, setNocon] = useState(false)

  const navigate = useNavigate();
  const { userId } = useParams();
  const url = 'https://source.unsplash.com/1600x900/?technology'
  const activeBtnStyle = 'bg-blue-700 mx-2 text-white dark:text-white font-bold p-2 rounded-xl px-4 w-25 m-2 outline-none'
  const nonActivebtnStyle = 'bg-gray-700 mx-2 text-white dark:text-white font-bold p-2 rounded-xl px-4 w-25 m-2 outline-none'

  useEffect(() => {
    // console.log(userId)
    const query = userQuery(userId);
    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      }).catch((err) => { setNocon(true); console.log(err) })
  }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId)
      client.fetch(createdPinsQuery).then((data) => {
        // console.log(reload)
        setPins(data)
        // console.log(data,'created')
      })
    } else {



      const savedPinsQuery = userSavedPinsQuery(userId)
      client.fetch(savedPinsQuery).then((data) => {
        console.log(data, 'save')
        setPins(data)
      }).catch((err) => { setNocon(true); console.log(err) })
    }
  }, [text, userId, reload])


  if (!user) {
    return <Spinner message="Loading profile" />
  }

  // console.log(user)

  const removeuser = (id) => {
    client
      .delete(id).then(
        () => {
          alert('suceess')
        }
      )

    window.reload();
  }
  // console.log(user)
  const logOut = () => {
    googleLogout();
    debugger
    localStorage.clear('user');
    navigate('/');
    window.location.reload()
    // alert('iworked')

    removeuser(user);
    // alert('iworked')

  }


  // console.log(userId === mainuser?._id)
  return (
    <>
      {
        nocon && (
          <>
            <NoInternet />
          </>
        )
      }

      {
        !nocon && (
          <>
            <div className='relative pb-2 h-full justify-center items-center'>
              <div className='flex flex-col pb-5'>
                <div className='relative flex flex-col mb-7'>
                  <div className='flex flex-col justify-center items-center '>
                    <img className='w-full h-370 2xl:h-510 object-cover shadow-lg' src={url} alt='banner_picture' />
                    <img className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover' referrerPolicy='no-refferer' src={user.image} alt='userimage' />
                    <h1 className='font-bold text-3xl text-center mt-3'>{user.userName}</h1>
                    {userId === mainuser?.sub ? (<>
                      <div className='absolute bg-transparent top-0 z-1 right-0 p-2 '>

                        <button
                          className='glitch'
                          onClick={() => { logOut(); }}>logout</button>
                      </div>
                    </>) : (<></>)}

                  </div>
                  <div className='text-center mb-7'>
                    <button type='button' onClick={(e) => {
                      setText('Created');
                      setActiveBtn('Created');
                      setReload(reload + 1)
                    }}
                      className={`${activeBtn === 'Created' ? activeBtnStyle : nonActivebtnStyle}`} >
                      Created
                    </button>
                    <button type='button' onClick={(e) => {
                      setText('Saved');
                      setActiveBtn('Saved');
                    }}
                      className={`${activeBtn === 'Saved' ? activeBtnStyle : nonActivebtnStyle}`} >
                      Favorites
                    </button>

                  </div>
                  {
                    pins?.length ? (
                      <div className='px-2'>
                        <MasonaryLayout Pins={pins} />
                      </div>
                    ) : (<div className='text-center'>No Post Found</div>)

                  }
                </div>
              </div>
            </div>
          </>
        )
      }



    </>
  )



}

export default UserProfile;