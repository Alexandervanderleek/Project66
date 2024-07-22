import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewHabbitModal from '../components/NewHabbitModal'
import { useSelector } from 'react-redux'
import Habbit from '../components/Habbit'

const Home = () => {
  
  console.log("reload")

  const user = useSelector(({user}) => {
    return user
  });

  const [habbits, setHabbits] = useState(null);

  const createNewHabbit = (values) => {
    
    const start = new Date();
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 23, 59, 59, 999);
    
    console.log(values)

    axios.post('/api/habbits/new',{
      title: values.habbitName,
      description: values.habbitDescription,
      icon: values.emoji,
      Days: 0,
      start: start,
      expire: end,
    }).then((res)=>{
      console.log("sucess")
    }).catch((err)=>{
      console.log("error")
    })


    console.log(start.toISOString())
    console.log(start)
    console.log(end.toISOString())
    console.log(end)
  } 

  useEffect(()=>{
    if(user){
      console.log(user)
      axios.get('/api/user/habbits',{withCredentials: true}).then((res)=>{
        
        setHabbits(res.data.habbits)
        console.log(res.data.habbits)

      }).catch((err)=>{
        console.log(err)
      })
    }
  },[user])


  return (
    <div className='flex justify-center items-start min-h-0.5'>
    <div className='w-3/4 xl:w-1/2 flex flex-col'>
      <div className='flex justify-between p-3 items-center'>
        <h1 className='font-semibold text-2xl'>Your habbits</h1>
        <NewHabbitModal createNewHabbit={createNewHabbit} />
      </div>

      <div className='bg-gray-200 rounded-md flex-grow flex items-center justify-center min-h-[200px]'>
        {habbits && habbits.length > 0 ? (
          <div className='flex flex-col my-4 w-full md:w-3/4'>
            {/* Render your habbits here */}
            {habbits.map(habbit => (
              <Habbit 
                key={habbit.id} 
                habbit={habbit} 
                onDelete={()=>{console.log("del")}}
                onComplete={()=>{console.log("complete")}}
              />
            ))}

          </div>
        ) : (
          <div className='text-center'>
            <p className='text-gray-500 text-lg'>
              Add A new habbit 
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default Home
