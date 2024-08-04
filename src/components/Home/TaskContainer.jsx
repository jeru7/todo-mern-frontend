import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircle,
  faCircleCheck,
  faPenToSquare,
} from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

const TaskContainer = ({ taskItem, onUpdateTask, deleteTask, editTask }) => {
  const [showDescription, setShowDescription] = useState(false)
  const [done, setDone] = useState(taskItem.done)

  const toggleStatus = async (e) => {
    e.stopPropagation()
    try {
      const response = await fetch(
        `https://todo-mern-frontend-two.vercel.app/tasks/${taskItem._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ done: taskItem.done }),
        }
      )

      if (!response.ok) {
        throw new Error("Unable to toggle the task's status")
      }

      const result = await response.json()
      onUpdateTask(taskItem._id, result.task)
      setDone(result.task.done)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <motion.div
      className='flex flex-col gap-1 px-2 py-3 border rounded-md cursor-pointer border-secondary bg-inherit'
      onClick={() => setShowDescription((prev) => !prev)}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {done ? (
            <FontAwesomeIcon
              icon={faCircleCheck}
              className='text-lg cursor-pointer text-accent'
              onClick={toggleStatus}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircle}
              className='text-lg cursor-pointer text-accent'
              onClick={toggleStatus}
            />
          )}
          <h3
            className={`text-lg truncate max-w-36 sm:max-w-56 sm:text-xl ${
              done ? 'text-slate-500 line-through' : 'text-white'
            }`}
          >
            {taskItem.title}
          </h3>
        </div>
        <AnimatePresence>
          {showDescription && (
            <motion.div
              className='flex items-center gap-3'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <FontAwesomeIcon
                icon={faPenToSquare}
                className='text-lg cursor-pointer text-success'
                onClick={(e) => {
                  e.stopPropagation()
                  editTask()
                }}
              />
              <FontAwesomeIcon
                icon={faTrash}
                className='text-lg cursor-pointer text-error'
                onClick={deleteTask}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showDescription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='text-sm break-words text-placeholder line-clamp-3'
          >
            {taskItem.description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskContainer
