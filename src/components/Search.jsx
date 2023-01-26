import React,{useState, useEffect} from 'react';

import MasonaryLayout from './MasonaryLayout';
import { client } from '../Client';
import { feedQuery,SearchQuery } from '../utilss/data';
import Spinner from './Spinner';
// import { NoInternet } from './no-internet';
const Search = ({searchTerm,noConnection,setNoConnection}) => {

  const [pins, setPins] = useState('');
  const [loading, setLoading] = useState(true);
  if(noConnection){
    setLoading(false)
  }
  
  useEffect(()=>{
    if(searchTerm){
      const query = SearchQuery(searchTerm.toLowerCase());
      client.fetch(query)
      .then((data)=>{
        // debugger;
         setPins(data);
        setLoading(false); 
         setNoConnection(false);       
      })
      .catch((err)=>{setNoConnection(true);  setLoading(false)});
    }else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data);
        setLoading(false); 
         setNoConnection(false);
      })
      .catch((err)=>{setNoConnection(true);  setLoading(false)});
      // console.log('iam');
    };
  },[searchTerm]);
   
  // console.log(nocon)
 
  return (
    <div>
      { loading && <Spinner message='Searching for Post'/>}
      {pins?.length !==0 && <MasonaryLayout Pins={pins}/>}
      { searchTerm !== '' && !loading && pins?.length === 0 && !noConnection && (
        <>
        <div className='mt-1- text-center text-xl'>No related images found</div>
        </>)}
    </div>
  )
}

export default Search;