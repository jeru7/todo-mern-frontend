const DeleteModal = ({ onClose, taskToDelete, onDeleteTask }) => {
  const deleteTask = async () => {
    try {
      const response = await fetch(
        `https://todo-mern-backend-rust.vercel.app/tasks/${taskToDelete._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete task')
      }

      const result = await response.json()
      onDeleteTask(result.task._id)
      onClose()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='fixed z-20 flex flex-col gap-2 p-4 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] rounded-md bg-primary top-1/2 left-1/2'>
      <div className='h-full text-center text-white'>
        Are you sure you want to delete this task?
      </div>
      <div className='flex items-center w-full gap-4'>
        <button
          className='w-full py-1 rounded-sm bg-secondary text-primary'
          onClick={onClose}
        >
          BACK
        </button>
        <button
          className='w-full py-1 text-white rounded-sm bg-accent'
          onClick={deleteTask}
        >
          YES
        </button>
      </div>
    </div>
  )
}

export default DeleteModal
