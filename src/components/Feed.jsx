import React from 'react';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
  // import { NoInternet, NoInternetBar } from '../components/no-internet/index';
import { client} from '../Client';
import { feedQuery, SearchQuery } from '../utilss/data';
import MasonaryLayout from './MasonaryLayout';
import Spinner from './Spinner';


const Feed = ({setNoConnection,noConnection}) => {
  const [Pins, setPins] = useState(null)              
  const [loading,setLoading]=useState(true);
  // const [nocon, setNocon] = useState(false)
  const {categoryId}=useParams();



  useEffect(()=>{

    if(noConnection){
      setLoading(false)
    }

    if(categoryId){
      const query =SearchQuery(categoryId)
           
      client.fetch(query)
      .then((data)=>{
        setPins(data);
        setLoading(false);
        setNoConnection(false);
      }).catch((err)=>{setNoConnection(true);})
    }else {
        client.fetch((feedQuery))
        .then((data)=>{
          setPins(data);
          setLoading(false);
          setNoConnection(false);
        }).catch((err)=>{setNoConnection(true);})
    }

  },[categoryId])

  // console.log(noConnection)
  
  // const notfound=()=>{
  //       setLoading(false);
  //       return<Internet/>
  // }

  if(loading) {
    setTimeout(() => {setLoading(false);}, 20000);

    return (
      <>
        <Spinner message='We are adding new ideas to your feed !'/>
      </>
    )
  }
  return (
    <div className=''>
    {Pins && <MasonaryLayout Pins={Pins} />}
    
    </div>
  )
  
}

export default Feed;