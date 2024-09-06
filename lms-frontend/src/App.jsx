import { Route, Routes } from 'react-router-dom';



import HomePage from './Pages/HomePage.jsx';
import AboutUs from './Pages/AboutUs.jsx';
import NotFound from './Pages/NotFound.jsx';
import Signup from './Pages/Signup.jsx';
import Login from './Pages/Login.jsx';
import CourseList from './Pages/Courses/CourseList.jsx';
import Contact from './Pages/Contact.jsx';
import Denied from './Pages/Denied.jsx';
import CourseDescription from './Pages/Courses/CourseDescription.jsx';
import RequireAuth from './Components/Auth/RequireAuth.jsx';
import CreateCourse from './Pages/Courses/CreateCourse.jsx';
import Profile from './Pages/User/profile.jsx';
import EditProfile from './Pages/User/EditProfile.jsx';
import Checkout from './Pages/Payment/Checkout.jsx';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess.jsx';
import CheckoutFail from './Pages/Payment/CheckoutFail.jsx';
import DisplayLectures from './Pages/Dashboard/DisplayLectures.jsx';
import AddLecture from './Pages/Dashboard/AddLecture.jsx';
import AdminDashboard from './Pages/Dashboard/AdminDashboard.jsx';
import UpdatePassword from './Pages/User/UpdatePassword.jsx';
function App() {

 
  return (
    <>
    {/* <h1 className='py-10 bg-white font-bold'>lms</h1> */}
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/about' element={<AboutUs/>}></Route>
        <Route path='/courses' element={<CourseList/>}></Route>
        <Route path='/denied' element={<Denied/>}></Route>
        <Route path='/course/description' element={<CourseDescription/>}></Route>

        <Route  element={<RequireAuth allowedRoles= {["ADMIN"]} />}>
          <Route  path='/course/create' element={<CreateCourse/>}/>
          <Route  path='/course/addlecture' element={<AddLecture/>}/>
          <Route  path='/admin/dashboard' element={<AdminDashboard/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]}/>}>
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/checkout/success' element={<CheckoutSuccess/>} />
          <Route path='/checkout/fail' element={<CheckoutFail/>} />
          <Route  path='/user/profile' element={<Profile/>}/>
          <Route  path='/user/editprofile' element={<EditProfile/>}/>
          <Route  path='/course/displaylectures' element={<DisplayLectures/>}/>
          <Route path='/changepassword'  element={<UpdatePassword/>}/>
        </Route>

        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
      
    </>
  )
}

export default App;
