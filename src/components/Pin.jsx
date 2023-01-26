import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { client, urlfor } from '../Client';
import { v4 as uuidv4 } from 'uuid';
import { BsDownload } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { FcLike } from 'react-icons/fc';
import { TbHeartPlus } from 'react-icons/tb';
import { AiOutlineCaretUp } from 'react-icons/ai';
import { ImArrowUpRight2 } from 'react-icons/im';
import { Fetchuser } from '../utilss/Fetchuser';

const Pin = ({ pin }) => {

  const { postedBy, image, _id, destination, save } = pin
  const navigate = useNavigate()

  const [PostHovered, setPostHovered] = useState(false);
  const [caret, setCaret] = useState(false)

  // console.log(_id)

  const user = Fetchuser();
  // ! TO rechecking code after completation
  // TODO code provided by tutorial is commented 
  // const alreadySaved = ()=>{
  //   if(save===null || save===0){
  //     return false
  //   }else{
  //     return !!((save?.filter((item) => item.postedBy?._id === user?.sub))?.length)
  //   }
  // }

  const alreadySaved = !!((save?.filter((item) => item.postedBy?._id === user?.sub))?.length)

  // ! ########################################

  // console.log(typeof save)
  // console.log(save.length)
  // TODO console.log(!!((save?.filter((item)=>item.postedBy?._id === user?.googleID)).length ))

  const savePin = (id) => {
    if (!alreadySaved) {
      console.log(id)

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: user.sub
          }
        }])
        .commit()
        .then(() => {
          window.location.reload();
        })
    }
  }

  const deletePin = (id) => {
    client
      .delete(id).then(
        window.location.reload()
      )
  }

  // console.log(pin)

  return (
    <div className='mx-3 my-5 bg-[#0000001d] dark:bg-[#09020230] rounded-md'>
      <div className='relative cursor-zoom-in m-auto overflow-hidden rounded-lg hover:shadow-xl transition-all duration-500 ease-in-out '
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => {
          navigate(`/pin-detail/${_id}`);
          document.title = `SHARE WITH US - Postedby/${pin?.postedBy?.userName}`
        }}
      >
        <img className='rounded-lg w-full' alt='' src={urlfor(image).width(250).url()} />

        {PostHovered && (
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 dark:bg-transparent pt-2 pb-2 z-50' style={{ height: '100%' }}>
            <div className='flex items-center dark:bg-transparent justify-between '>
              {
                user && (
                  <div className='flex bg-transparent  gap-2'>
                <a href={`${image?.asset?.url}?dl=`}
                  download
                  className='bg-blue-50 cursor-pointer dark:bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none p-0'
                  onClick={(e) => e.stopPropagation()}
                >
                  <BsDownload className='bg-transparent  text-black' size={20} />
                </a>
              </div>
                )
              }
              {
                !user && (
                  <div></div>
                )
              }

              {alreadySaved ? (
                <button
                  type='button'
                // TODO oldCode className='bg-blue-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                // ! {save?.length} 
                >
                  <FcLike className='bg-blue-100 dark:bg-gray-600 opacity-70 hover:opacity-100 p-2 rounded-full' size={45} />
                </button>)
                : (<button
                  onClick={(e) => {
                    if (user) {
                      e.stopPropagation()
                      savePin(_id);
                      window.location.reload();
                    } else {
                      alert("you need to login First")
                    }
                  }}
                  onMouseEnter={() => setCaret(true)}
                  onMouseLeave={() => setCaret(false)}
                  type='button'
                  className=''
                // TODO className='bg-blue-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                >
                  <TbHeartPlus 
                    className='bg-blue-100 dark:bg-gray-700 opacity-70 hover:opacity-100 p-2 rounded-full' fontSize={45} />
                  {
                    caret && (
                      <div className='bg-transparent absolute right-4 top-10  flex flex-col items-end'>
                        <AiOutlineCaretUp className='bg-transparent ' fontSize={25} />
                        <p className='border-2 border-black text-white  dark:border-white -m-2 px-2 py-1 z-50 w-fit rounded-md bg-blue-500 '>Add to favourites</p>
                      </div>
                    )
                  }
                  {/* * // Save */}
                </button>
                )}
            </div>
            <div className='flex justify-center items-center gap-1 w-1/2'>
              {destination && (
                <a href={destination}
                  target='_blank'
                  rel='noreferrer' className='bg-blue-50 absolute left-[10px] bottom-[10px] flex items-center gap-1 text-black font-bold p-1
                  pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                  <ImArrowUpRight2 size={20} className='mr-1 dark:bg-black rounded-full p-[5px]' />
                  {
                    destination.length > 20 ? destination.length > 20 ? destination.slice(8, 20) : destination.slice(8) : destination
                  }
                </a>
              )}
              {
                user ? (
                  <>
                    {postedBy?._id === user.sub && (
                      <button
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePin(_id)

                        }}
                        className='opacity-70 absolute right-[10px] bottom-[10px] hover:opacity-100 rounded-full hover:shadow-md outline-none'
                      >
                        <div className='bg-blue-700 rounded-full flex justify-center items-center  w-10 h-10'><MdDelete color='white' className='bg-blue-700' size={25} /></div>

                      </button>)}
                  </>)
                  : (<></>)
              }
            </div>
          </div>
        )}
      </div>
      {/* {console.log(postedBy.image)} */}
      <div onClick={() => navigate(`/user-profile/${postedBy?._id}`)} className='flex gap-2 m-2 pb-2 items-center' >
        <img className='w-8 h-8 rounded-full object-cover' referrerPolicy="no-referrer"  src={postedBy?.image} alt='user' />
        <p className='mw:text-lg sm:text-sm  capitalize'>{postedBy?.userName}</p>
      </div>
    </div>
  )
}

export default Pin