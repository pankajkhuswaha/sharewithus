import  { useState,useEffect } from 'react';

function NetworkDetector() {
  const [netStaus, setnetStaus] = useState(navigator.online);

    useEffect(()=>{
        const setonline = ()=>{
            setnetStaus(true);
        };
        const setoffline = ()=>{
                setnetStaus(false);
        };
        window.addEventListener('online', setonline);
        window.addEventListener('offline', setoffline);
        return()=>{
            window.removeEventListener('online', setonline);
            window.removeEventListener('offline', setoffline);

        }

    },[]);
    
    return <div>{netStaus}</div>
    

}

export default NetworkDetector;
