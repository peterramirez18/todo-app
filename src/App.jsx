import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"

// import assets

import CheckIcon from "./assets/icon-check.svg"
import CrossIcon from "./assets/icon-cross.svg"
import BgDarkDesktop from "./assets/bg-desktop-dark.jpg"
import BgLightDesktop from "./assets/bg-desktop-light.jpg"
import BgDarkMobile from "./assets/bg-mobile-dark.jpg"
import BgLightMobile from "./assets/bg-mobile-light.jpg"
import ToggleMode from './components/ToggleMode'

const App = () => {

  const Tasks = []
  // states
  const [tasks, setTasks] = useState(Tasks)
  const [tabSelect, setTabSelect] = useState('All')
  const [thereIsCompleted, setThereIsComplete] = useState(0)
  const [write, setWrite] = useState('')
  const [itemsLeft, setItemsLeft] = useState(0)
  const [isAdd, setIsAdd] = useState(false)

  useEffect(() => {
    const result = tasks.filter(
      (task) => task.status === "Completed"
    )
    return setThereIsComplete(result.length)
  })
  useEffect(() => {
    const result = tasks.filter(
      (task) => task.status != "Completed"
    )
    return setItemsLeft(result.length)
  })
  useEffect(() => {
    if (tasks.length > 0) {
      const result = tasks.filter(
        (task) => task.name
      )
      for (let i = 0; i < tasks.length; i++) {
        if (result[i].name === write) {
          setIsAdd(true)
        } else
          setIsAdd(false)
      }
    }
  })

  // function
  const getFilteredProjects = () => {
    if (tabSelect === "All") return tasks;

    const result = tasks.filter(
      (task) => task.status === tabSelect
    )
    return result
  }

  const handleClickAdd = () => {
    if (write != "" && !isAdd) {
      const newTask = { name: write, status: 'Active' }
      setTasks([...tasks, newTask])
      setWrite("")
      setTabSelect("All")
    }
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleClickAdd()
    }
  }
  const handleClickComplete = (item) => {
    const newTask = tasks.map((task) => {
      if (task.name === item.name) {
        if (task.status != "Completed") {
          return {
            ...task,
            status: 'Completed'
          }
        } else {
          return {
            ...task,
            status: 'Active'
          }
        }
      }
      return task
    })
    setTasks(newTask)
  }

  const handleClickDelete = (item) => {
    const newArr = tasks.filter(
      (task) => task.name != item
    )
    return setTasks(newArr)
  }

  const clearCompleted = () => {
    const newArr = tasks.filter(
      (task) => task.status != "Completed"
    )
    return setTasks(newArr)
  }

  return (
    <main className=' min-h-screen pb-8 relative flex flex-col bg-light-grayish-blue/50 mx-auto w-full px-5 pt-10 md:pt-[4.6rem] dark:bg-dark-very-dark-blue'>
      <div className='md:hidden '>
        <img className=' dark:hidden absolute left-0 top-0 w-[100vw] object-cover' src={BgLightMobile} alt="" />
        <img className=' hidden dark:block absolute left-0 top-0 w-[100vw] object-cover' src={BgDarkMobile} alt="" />
      </div>
      <div className='hidden md:block '>
        <img className=' dark:hidden absolute left-0 top-0 w-[100vw] object-cover' src={BgLightDesktop} alt="" />
        <img className=' hidden dark:block absolute left-0 top-0 w-[100vw] object-cover' src={BgDarkDesktop} alt="" />
      </div>
      <div className='w-full md:w-[540px] mx-auto  relative flex items-center justify-between text-white'>
        <span className=' text-3xl md:text-[2.65rem] font-bold tracking-[1rem]'>TODO</span>
        <ToggleMode />
      </div>
      <div className='w-full md:w-[540px] mx-auto  relative mt-[46px] flex flex-1 flex-col gap-y-6'>
        {/* create */}
        <div className={`${isAdd && 'border-red-500 border'} box dark:box-dark relative`}>
          <div>
            <div className=' w-6 h-6 border-2 rounded-full dark:border-dark-very-dark-grayish-blue-2'></div>
          </div>
          <input onKeyDown={handleKeyDown} onChange={(e) => setWrite(e.target.value)} value={write} className={` ${isAdd && 'text-red-400'} focus:border-none text-dark-very-dark-grayish-blue focus:outline-none  w-full bg-transparent dark:text-dark-light-grayish-blue-hover `} type="text" placeholder='Create a new todo...' />
          {isAdd && <div className='absolute bg-red-400 text-white p-2 rounded-lg -bottom-12 z-20 left-0 transition-all duration-300'>There's a task with same name</div>}
          <button>
            <img
              onClick={() => handleClickAdd()}
              className=' rotate-45' src={CrossIcon} alt="" />
          </button>
        </div>

        {/* taskss */}
        <div className='flex-1 relative bg-white dark:bg-dark-very-dark-desaturated-Blue flex flex-col rounded-lg overflow-hidden '>
          {getFilteredProjects().length === 0 ?
            <div className=' text-dark-grayish-blue  flex items-center justify-center absolute inset-0'>
              There's not task in {tabSelect}
            </div> :
            <div>
              {
                getFilteredProjects().map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className='flex group items-center gap-x-3 px-6 border-b-2 dark:border-b-dark-very-dark-grayish-blue-2 py-4 text-very-dark-grayish-blue'>
                    <div
                      onClick={() => handleClickComplete(item)}
                      className='flex items-center gap-x-6 flex-1 cursor-pointer'>
                      <div className={`${item.status === 'Completed' ? ' bg-gradient-to-br from-blue to-purple border-none' : ''} relative flex items-center justify-center w-6 h-6 border-2 dark:border-dark-very-dark-grayish-blue-2 rounded-full hover:border-dark-grayish-blue`}>
                        {item.status === "Completed" && <img src={CheckIcon} alt="" />}
                      </div>
                      <span className={`${item.status === "Completed" && 'line-through opacity-50'} text-md tracking-wider dark:text-dark-light-grayish-blue transition-all duration-500`}>{item.name}</span>
                    </div>
                    <button>
                      <img onClick={() => handleClickDelete(item.name)} className='w-4 block md:hidden group-hover:block' src={CrossIcon} alt="" />
                    </button>
                  </motion.div>
                ))
              }
            </div>
          }
          <div className='flex  z-10 justify-between  mt-auto items-center gap-x-3  px-6 border-b-2 py-4 text-very-dark-grayish-blue'>
            <span className=' text-dark-grayish-blue'>{itemsLeft} items left</span>
            {/* tab */}
            <div className=' hidden md:flex '>
              {['All', 'Active', 'Completed'].map((item, index) => (
                <button key={index} onClick={() => setTabSelect(item)} className={`${tabSelect === item ? 'text-bright-blue cursor-default' : 'text-dark-grayish-blue hover:text-very-dark-grayish-blue'} px-3 `}>{item}</button>
              ))}
            </div>
            <button className={`${thereIsCompleted ? 'hover:text-very-dark-grayish-blue' : ' opacity-50 cursor-default'} text-dark-grayish-blue `} onClick={clearCompleted}>Clear Completed</button>
          </div>
        </div>

        {/* tab */}
        <div className="block md:hidden ">
          <div className='box dark:box-dark font-bold justify-center'>
            {['All', 'Active', 'Completed'].map((item, index) => (
              <button key={index} onClick={() => setTabSelect(item)} className={`${tabSelect === item ? 'text-bright-blue cursor-default' : 'text-dark-grayish-blue hover:text-very-dark-grayish-blue'} px-3 `}>{item}</button>
            ))}
          </div>
        </div>
        <span className=' text-dark-grayish-blue mx-auto font-bold my-5 dark:text-dark-very-dark-grayish-blue'>Drag and drop to reorder list</span>
      </div>
    </main >
  )
}

export default App
