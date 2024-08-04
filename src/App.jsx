import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <main className='h-screen bg-primary'>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </main>
  )
}

export default App
