import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

    const [userData, setUserData] = useState([]);
    const [index, setIndex] = useState(1)
    const getData = async() =>{
        const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=21`)
        setUserData(response.data);
        // console.log(userData);
    }

    useEffect(function(){
      getData()
    },[index])

    let printUserData = <h3 className='text-xl text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>Loading....</h3>

    if(userData.length > 0){
      printUserData = userData.map(function(elem,idx){
        return <div key={idx}>
          <a href={elem.url}target='_blank'>
         <div className='h-40 w-48 overflow-hidden  rounded-xl'>
          <img className='h-full w-full object-cover' src={elem.download_url} alt="" />
        </div>
          <h2 className='font-bold text-xl'>{elem.author}</h2>
          </a>
        </div>
      })
    }

  return (
    <div className='bg-black min-h-screen p-4 text-white'>

      <div className='flex flex-wrap gap-4 p-2'>
        {printUserData}
      </div>
      <div className='flex justify-center items-center p-4 gap-6'>
        <button
        style={{opacity: index ==1 ? 0.6 : 1}}
         className='bg-amber-400 text-black rounded font-semibold cursor-pointer active:scale-95 px-5 py-2 m-2'
         onClick={()=>{
          if(index>1){
            setIndex(index - 1)
          }
         }}
         >Prev</button>
         <h4 className=''>Page{index}</h4>
        <button
        onClick={()=>setIndex(index + 1)}
         className='bg-amber-400 text-black rounded font-semibold cursor-pointer active:scale-95 px-5 py-2 m-2'>Next</button>
      </div>
    </div>
  )
}

export default App
