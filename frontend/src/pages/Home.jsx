import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewHabbitModal from '../components/NewHabbitModal'
import { useDispatch, useSelector } from 'react-redux'
import Habbit from '../components/Habbit'
import { addHabbit, setHabbits} from '../reducers/habbitsReducer'


const Home = () => {
  
  const dispath = useDispatch();

  const user = useSelector(({user}) => {
    return user
  });

  const habbits = useSelector(({habbits})=>{
    return habbits
  })

  //function creating a new habbit
  const createNewHabbit = (values) => {
    
    //start (when created) and end of current day
    const start = new Date();
    const end = new Date(start.getFullYear(), start.getMonth(), start.getDate(), 23, 59, 59, 999);
    
    const newHabbit = {
      title: values.habbitName,
      description: values.habbitDescription,
      icon: values.emoji,
      Days: 0,
      start: start,
      expire: end,
      today: true,
      status: 'active'
    }

    axios.post('/api/habbits/new',newHabbit).then((res)=>{

      //console.log(res.data.createdHabbit)

      dispath(addHabbit(res.data.createdHabbit));
    }).catch((err)=>{
      console.log("error")
    })
  } 

  useEffect(()=>{
    if(user){
      axios.get('/api/user/habbits',{withCredentials: true}).then((res)=>{
        dispath(setHabbits(res.data.habbits))
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
              />
            ))}

          </div>
        ) : (
          <div className='text-center'>
            <p className='text-gray-500 text-lg'>
              Add a new habbit 
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default Home
