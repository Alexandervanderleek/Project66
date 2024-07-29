import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NewHabbitModal from '../components/NewHabbitModal'
import { useDispatch, useSelector } from 'react-redux'
import Habbit from '../components/Habbit'
import { addHabbit, setHabbits} from '../reducers/habbitsReducer'
import { showToast } from '../reducers/toastReducer'


const Home = () => {

  const dispath = useDispatch();

  const user = useSelector(({user}) => {
    return user
  });

  const habbits = useSelector(({habbits})=>{
    return habbits
  })

  console.log(habbits)

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

      console.log(res.data.createdHabbit)

      dispath(addHabbit(res.data.createdHabbit));
    }).catch((err)=>{

      dispath(showToast({
        message: 'Too many active habbits',
        type: 'error'
      })) 
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
    <div className='w-full md:w-3/4 xl:w-1/2 flex flex-col'>
      <div className='flex justify-between p-3 items-center'>
        <h1 className='font-semibold text-2xl'>Your habbits</h1>
        <NewHabbitModal createNewHabbit={createNewHabbit} />
      </div>

      <div role="tablist" className="tabs tabs-lifted tabs-lg">
        <input type="radio" defaultChecked name="my_tabs_2" role="tab" className="tab [--tab-bg:#e5e7eb]" aria-label="To do" />
        <div role="tabpanel" className="tab-content bg-gray-200 rounded-md">
        <div className='flex justify-center flex-grow items-center min-h-[200px]'>
        {habbits && habbits.filter(habbit => habbit.status === 'active' && habbit.today === true).length > 0 ? (
          <div className='flex flex-col my-4 w-full md:w-3/4 mx-2'>
            {habbits.filter((habbit) => habbit.status === 'active' && habbit.today === true).map((habbit, index) => (
              <Habbit
                key={habbit.id}
                habbit={habbit}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className='text-center'>
            <p className='text-gray-500 text-lg'>
              Add a new habit
            </p>
          </div>
        )}
        </div>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:#e5e7eb]" aria-label="Done" />
        <div role="tabpanel" className="tab-content bg-gray-200 rounded-md">
        <div className='flex justify-center flex-grow items-center min-h-[200px]'>
        {habbits && habbits.filter(habbit => habbit.status === 'active' && habbit.today === false).length > 0 ? (
          <div className='flex flex-col my-4 w-full md:w-3/4 mx-2'>
            {habbits.filter((habbit) => habbit.status === 'active' && habbit.today === false).map((habbit, index) => (
              <Habbit
                key={habbit.id}
                habbit={habbit}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className='text-center'>
            <p className='text-gray-500 text-lg'>
              No completed habits for today
            </p>
          </div>
        )}
        </div>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:#e5e7eb]" aria-label="Failed & Completed" />
        <div role="tabpanel" className="tab-content bg-gray-200 rounded-md">
        <div className='flex justify-center flex-grow items-center min-h-[200px]'>
        {habbits && habbits.filter(habbit => habbit.status !== 'active').length > 0 ? (
            <div className='flex flex-col my-4 w-full md:w-3/4 mx-2'>
              <h1 className='font-semibold m-2 text-lg'>Last 10:</h1>
              {habbits.filter((habbit) => habbit.status !== 'active').map((habbit, index) => (
                <Habbit
                  key={habbit.id}
                  habbit={habbit}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className='text-center'>
              <p className='text-gray-500 text-lg'>
                No recently failed or completed habits
              </p>
            </div>
          )}
        </div>
        </div>


      </div>


    </div>
  </div>
  )
}

export default Home
