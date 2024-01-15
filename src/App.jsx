import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import Index from './components/CRUD/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className="App">
      <h1 className=''>Hello</h1>
      <Index/>
      {/* <SearchBar /> */}
    </div>
    </>
  )
}

export default App
