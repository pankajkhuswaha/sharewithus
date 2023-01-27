import React from 'react';
import { useState, useEffect } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import { client, urlfor } from "../Client";
import MasonaryLayout from "./MasonaryLayout";
import { BsDownload } from "react-icons/bs";
import { FiSend } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';

import { pinDetailMorePinQuery, pinDetailQuery } from '../utilss/data';
import Spinners from './Spinner'

const PinDetails = ({ user }) => {

  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const { pinId } = useParams();

  // console.log(user)
  // const navigate = useNavigate()


  const addComment = () => {
    if (comment && user) {
      setAddingComment(true);
      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{
          comment,
          _key: uuidv4(),
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }]).commit().then(() => {
          fetchPinDetaisQuery();
          setComment('');
          setAddingComment(false)
          console.log('sucess')
        })
    } else {
      alert('Please Login to comment')
    }
  }

  const fetchPinDetaisQuery = () => {
    const query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0]);

          if (data[0]) {
            const query = pinDetailMorePinQuery(data[0])
            client.fetch(query)
              .then((res) => setPins(res))
          }
        })
    }
  }

  useEffect(() => {
    fetchPinDetaisQuery();
  }, [pinId])

  if (!pinDetail) return <Spinners message='Loading Post' />


  return (
    <>
      <div className='flex my-3 xl-flex-row flex-col m-auto bg-white dark:bg-[#000000ec]' style={{ maxwidth: '150px', borderRadius: '32px' }}>
        <div className='flex justify-center items-center md:items-start dark:bg-[#0000003b] md:flex-initial'>
          <img src={pinDetail?.image && urlfor(pinDetail.image).url()} alt='user Post' className='m-2 mt-4 rounded-3xl rounded-b-lg' />
        </div>
        <div className='w-full p-5 flex-1 xl:min-w-[620px] md:flex-initial bg-transparent dark:bg-gray-900- dark:bg-[#0000003b]'>
          <div className='flex items-center justify-between dark:bg-transparent'>
            {!user && (<div></div>)}
            {user && (
              <a href={`${pinDetail?.image?.asset?.url}?dl=`}
              download
              className='bg-blue-50 cursor-pointer dark:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-dark text-xl opacity-100 hover:shadow-md outline-none p-0'
              onClick={(e) => e.stopPropagation()}
            >
              <BsDownload className='bg-transparent text-black' size={20} />

            </a>
            )}
            <a href={pinDetail?.destination} className='dark:bg-gray-900- dark:bg-[#0000003b]-' target='_blank' rel='noreferrer'> {pinDetail?.destination}</a>
          </div>
          <div className='flex gap-2items-center'>
            <div>
              <h1 className='mw:text-4xl text-3xl font-semibold breaks-words dark:bg-gray-900- pt-3 '>{pinDetail.title}</h1>
              <p className='dark:bg-gray-900-'>{pinDetail?.about}</p>
            </div>
          </div>
          <NavLink to={`/user-profile/${pinDetail?.postedBy?._id}`} className='flex gap-2 items-center mt-1 mw:mt-5 bg-white p-2 h-10 dark:bg-transparent -mb-4 mw:mb-0 rounded-lg' >
            <img className='w-9 h-9  mw:w-14 mw:h-14 rounded-full border-2  border-black border-solid object-cover' src={pinDetail?.postedBy?.image} alt='user' />
            <p className='font-semibold bg-transparent capitalize'>{pinDetail?.postedBy?.userName}</p>
          </NavLink>
          {pinDetail?.comments ? (<>
            <h2 className='mt-5 text-2xl bg-transparent text-gray-700 dark:text-gray-300 '>Comments:</h2>
          </>) : (<></>)

          }
          {/* {pinDetail.comments} */}
          <div className='max-h-370 overflow-y-auto bg-transparent'>
            {pinDetail?.comments?.map((comment, i) => (
              <div className='flex gap-2 mt-5 items-center bg-white dark:bg-transparent rounded-lg ' key={i}>
                <img src={comment.postedBy.image} alt='user' className='w-10 h-10 rounded-full  border-2 border-black border-solid cursor-pointer' />
                <div className='flex flex-col bg-transparent'>
                  <p className='font-bold bg-transparent'>{comment.postedBy.userName}</p>
                  <p className='bg-transparent'>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>

          <div className='flex h-10 dark:bg-gray-900- rounded-full  items-center justify-center mt-6 gap-3 py-[4px]'>
            <div className='bg-transparent rounded-full'>
              {
                user ? (
                  <>
                    <Link to={`/user-profile/${user?.picture}`}
                    referrerPolicy='no-referrer' className='gap-2 items-center bg-white dark:bg-gray-900 rounded-full' >
                      <img className='w-10 h-10 rounded-full object-cover border-2 border-black border-solid' src={user?.image} alt='user' />
                    </Link>
                  </>) : (<><FaUser onClick={() => alert('Please login')} /></>)
              }
            </div>
            <input className='flex-1 h-10 bg-gray-900 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
              type='text'
              placeholder='Add a Comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type='button' onClick={addComment} className='bg-blue-700 text-white rounded-full px-3 py-3 font-semibold text-base outline-none'>
              {addingComment ? 'Posting' : (<><FiSend className='bg-blue-700 text' fontSize={20} /></>)}
            </button>
          </div>


        </div>
      </div>
      {
        pins?.length > 0 ? (
          <>
            <h2 className='text-bold text-center text-2xl capitalize p-2 my-3 dark:bg-gray-800 bg-blue-50 rounded-2xl'>
              More like this
            </h2>

            <MasonaryLayout Pins={pins} />
          </>
        ) : (<>
          <Spinners message='Loading more pins' />
          {/* <div>No Related Image Found</div> */}
        </>
          )
      }
    </>
  )
}

export default PinDetails;