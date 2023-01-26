import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { client } from '../Client';
import { categories } from '../utilss/data';
import { MdDelete } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai'
import Spinner from './Spinner';
import { Fetchuser } from '../utilss/Fetchuser';



const CreatePin = () => {
  const [title, settitle] = useState('');
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(false);
  const [category, setcategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState('')

  const navigate = useNavigate();
  const user = Fetchuser()
  // console.log(user)
  // console.log(imageAsset)

  const uploadimage = (e) => {
    const { type, name } = e.target.files[0]


    if (type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/jpg' || type === 'image/gif' || type === 'image/giff' || type === 'image/tiff' || type === 'image/pdf') {
      setWrongImageType(false)
      setLoading(true)

      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name })
        .then((document) => {
          setImageAsset(document)
          setLoading(false)
        })
        .catch((error) => { console.log('image upload error', error) })
    } else {
      setWrongImageType(true)
    }
  }
  const uploadPost = ()=>{
    if(title && about && destination && imageAsset?._id && category){
      const doc ={
        _type:'pin',
        title,
        about,
        destination,
        image:{
          _type:'image',
           asset:{
            _type:'reference',
            _ref:imageAsset?._id
          }
        },
        userId:user.sub,
        postedBy:{
          _type:'postedBy',
          _ref:user.sub,
        },category
      }
      client.create(doc)
      .then(()=>{
        navigate('/')
        window.location.reload();
      })
    }else{
      setFields(true);
      setTimeout(()=>setFields(false),2000)
    }
  }
//  console.log(user)
  return (
    <>

      <div className='flex flex-col justify-center items-center mt-5 shadow-lg  h-fit '>
        {fields && (
          <p className='text-red-500 mb-5 text-xl tranistion-all duration-150 ease-in-out'>Please fill all the fields</p>
        )}
        {wrongImageType && <p className='text-red-500 mb-5 text-xl text-center tranistion-all duration-150 ease-in-out'> Wrong type image ! <br /> please upload image in given format</p>}

        <div className='flex lg:flex-row flex-col justify-center dark:bg-gray-900- dark:bg-[#0000003b] bg-white lg:p-5 p-3 lg:h-4/5 w-full '>
          <div className='bg-secondaryColor dark:bg-gray-900 p--3 flex flex-0.7 h-fit w-full my-2 lg:my-3'>
            <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 min-h-[420px] w-full h-fit min-h-420 p-4 '>
              {loading && <Spinner />}
              {!imageAsset ? (
                <label>
                  <div className='flex flex-col items-center justify-center  h-full '>
                    <div className='flex flex-col justify-center items-center'>
                      <p className='font-bold text-2xl'>
                        <AiOutlineCloudUpload />
                      </p>
                      <p className='text-lg'>Click to Upload</p>
                    </div>
                    <p className='mt-3 text-gray-400 text-center'> Use high quality image which is less then 20MB</p>
                  </div>
                  <input type='file' onChange={uploadimage} className='w-0 h-0'></input>
                </label>
              ) : (
                <>
                  <div className='relative h-full flex flex-col '>
                    <img src={imageAsset?.url} alt='uploaded-pic' className='h-full' />
                    <button
                      type='button' className='mt-4 flex items-center p-3 rounded-md  text-xl cursor-pointer bg-blue-200 dark:bg-gray-900 hover:bg-blue-300 dark:hover:bg-gray-800  outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                      onClick={() => setImageAsset(null)}>
                      <div className='bg-blue-700 mx-3 rounded-full flex justify-center items-center  w-10 h-10'><MdDelete color='white' className='bg-blue-700' size={25} /></div>
                      <p className='bg-transparent text-red-500'>Delete Selected image !</p>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='flex flex-1 flex-col gap-y lg:pl-5 mt-5 dark:bg-gray-900- w-full'>
            <input type='text' value={title} onChange={(e) => settitle(e.target.value)} placeholder='Post title !' className='outline-none bg-transparent text-[20px] lg:text-2xl font-medium border-b-2 border-gray-200 p-2' />
            {user && (
              <>
                <div className='flex gap-2 my-2 items-center bg-slate-100 dark:bg-[#0000003b] rounded-lg '>
                  <img className='w-10 h-10 rounded-full dark:bg-transparent' src={user.picture} alt='user' />
                  <p className='font-bold bg-transparent'>{user.name}</p>
                </div>
              </>
            )}
            <input
              type='text'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Give details about Post"
              className='outline-none bg-transparent text-base sm:text-lg border-b-2 border-gray-200 p-2 m-2 mx-5 '
            />
            <input
              type='text'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Add a destination link"
              className='outline-none bg-transparent text-base sm:text-lg border-b-2 border-gray-200 p-2 m-2 mx-5 '
            />
            <div className='flex flex-col bg-transparent'>

              <p className='mb-2 font-semibold text-lg bg-transparent sm:text-xl p-2 m-2 mx-5'>
                Choose category of Post :</p>
              <select onChange={(e) => setcategory(e.target.value)} className='outline-none w-4/5 text-base border bg-transparent border-gray-200 p-2 m-2 mx-5 rounded-lg cursor-pointer'>
                <option value='other' className=' bg-white dark:bg-gray-900'> Select Categories</option>
                {categories.map((category,i) => (
                  <option key={i} className='text-base border-o outline-none capitalize dark:bg-gray-900 dark:text-white bg-white text-black '>{category.name}</option>
                ))}
              </select>

            </div>
            <div className='flex justify-end items-end mt-5 bg-transparent '>
              <button type='button' onClick={uploadPost} className='bg-blue-500 text-white font-bold p-2 rounded-lg  w-28 outline-none'>Upload Post </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePin;