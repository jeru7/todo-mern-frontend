import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const FloatingButton = ({ onClick }) => {
  return (
    <button
      className='fixed z-10 flex items-center justify-center p-6 rounded-full shadow-md bottom-12 right-12 bg-accent'
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faPlus} className='text-lg' />
    </button>
  )
}

export default FloatingButton
