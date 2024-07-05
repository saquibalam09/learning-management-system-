
import { Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './Components/Footer.jsx';

import HomePage from './Pages/HomePage.jsx';
import AboutUs from './Pages/AboutUs.jsx';
function App() {
  

  return (
    <>
    {/* <h1 className='py-10 bg-white font-bold'>lms</h1> */}
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
      </Routes>
      
    </>
  )
}

export default App;
