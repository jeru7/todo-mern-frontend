import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FloatingButton from '../components/Home/FloatingButton'
import { faFile } from '@fortawesome/free-solid-svg-icons'

import { useEffect, useState } from 'react'

import Loader from '../components/Loader'
import TaskContainer from '../components/Home/TaskContainer'
import AddEditModal from '../components/Home/AddEditModal'
import DeleteModal from '../components/Home/DeleteModal'

const Home = () => {
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [addEditModal, setAddEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks')
        if (!response.ok) {
          throw new Error('Invalid response')
        }
        const result = await response.json()
        setTasks(result.data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (addEditModal || deleteModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [addEditModal, deleteModal])

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const handleUpdateTask = (taskId, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedTask } : task
      )
    )
  }

  const handleDeleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task._id !== taskId)
    setTasks(newTasks)
  }

  return (
    <div className='relative h-screen bg-primary'>
      {(addEditModal || deleteModal) && (
        <div
          className='fixed z-20 w-full h-full opacity-50 bg-secondary'
          onClick={() => {
            setAddEditModal(false)
            setDeleteModal(false)
          }}
        ></div>
      )}
      <section className='flex flex-col items-center h-full p-4'>
        {tasks.length === 0 ? (
          <div className='flex flex-col justify-center h-full gap-2 sm:items-center'>
            <FontAwesomeIcon
              icon={faFile}
              className='h-24 opacity-75 text-secondary'
            />
            <p className='font-mono text-xs text-center text-slate-500'>
              Your task list is currently empty
            </p>
          </div>
        ) : loading ? (
          <Loader />
        ) : (
          <div className='flex flex-col w-full h-full gap-2 p-3 overflow-y-auto sm:w-[600px]'>
            {tasks.map((task) => (
              <TaskContainer
                key={task._id}
                taskItem={task}
                onUpdateTask={handleUpdateTask}
                editTask={() => {
                  setAddEditModal(true)
                  setCurrentTask(task)
                }}
                deleteTask={(e) => {
                  e.stopPropagation()
                  setDeleteModal(true)
                  setCurrentTask(task)
                }}
              />
            ))}
          </div>
        )}
      </section>
      <FloatingButton
        onClick={() => {
          setAddEditModal(true)
          setCurrentTask(null)
        }}
      />
      {addEditModal && (
        <AddEditModal
          onClose={() => setAddEditModal(false)}
          setLoading={setLoading}
          onAddTask={handleAddTask}
          onEditTask={handleUpdateTask}
          taskItem={currentTask}
          isEdit={currentTask !== null}
        />
      )}
      {deleteModal && (
        <DeleteModal
          taskToDelete={currentTask}
          onDeleteTask={handleDeleteTask}
          onClose={() => setDeleteModal(false)}
        />
      )}
    </div>
  )
}

export default Home
