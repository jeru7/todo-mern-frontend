import { useEffect, useState } from 'react'

const AddEditModal = ({
  onClose,
  onAddTask,
  taskItem,
  onEditTask,
  isEdit,
  setLoading,
}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    done: false,
  })

  useEffect(() => {
    if (isEdit && taskItem) {
      setTask({
        title: taskItem.title,
        description: taskItem.description,
        done: taskItem.done,
      })
    }
  }, [isEdit, taskItem])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }))
  }

  const addTask = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        'https://todo-mern-frontend-two.vercel.app/tasks',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...task,
            title: task.title.trim(),
            description: task.description.trim(),
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to add new task')
      }

      const result = await response.json()
      onAddTask(result.task)
    } catch (error) {
      console.log(error.message)
    }

    setLoading(false)
  }

  const updateTask = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://todo-mern-frontend-two.vercel.app/tasks/${taskItem._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...task,
            title: task.title.trim(),
            description: task.description.trim(),
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to edit task')
      }

      const result = await response.json()
      taskItem.title = result.task.title
      taskItem.description = result.task.description
      onEditTask(taskItem._id, result.task)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEdit) {
      updateTask()
    } else {
      addTask()
    }
    setTask({
      title: '',
      description: '',
      done: false,
    })
    onClose()
  }

  return (
    <form
      className='fixed z-20 flex flex-col gap-2 p-4 w-full h-full bg-primary md:h-[500px] md:w-[700px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:rounded-md'
      onSubmit={handleSubmit}
    >
      <label htmlFor='title' className='text-lg font-normal text-white'>
        Task name
      </label>
      <input
        type='text'
        required
        name='title'
        placeholder='Enter task name...'
        value={task.title}
        onChange={handleInputChange}
        className='p-2 text-white border rounded-md bg-primary border-secondary'
      />
      <label htmlFor='description' className='text-lg font-normal text-white'>
        Task description
      </label>
      <textarea
        required
        name='description'
        value={task.description}
        onChange={handleInputChange}
        placeholder='Enter task description...'
        className='h-full p-2 text-white border rounded-md resize-none bg-primary border-secondary'
      />
      <div className='flex gap-4'>
        <button
          type='button'
          onClick={onClose}
          className='w-full p-2 text-lg rounded-md bg-secondary text-placeholder'
        >
          BACK
        </button>
        <button
          type='submit'
          className='w-full p-2 text-lg text-white rounded-md bg-accent'
        >
          {isEdit ? 'SAVE' : 'ADD'}
        </button>
      </div>
    </form>
  )
}

export default AddEditModal
