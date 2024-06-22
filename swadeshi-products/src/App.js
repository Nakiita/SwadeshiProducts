import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ForgetPassword from "./pages/ForgotPassword";
import NavbarLogin from "./components/Navbar_login";
import Footer from "./components/Footer";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/user/HomePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEditProduct from "./pages/admin/AdminEdit";
import AdminView from "./pages/admin/AdminView";
import Sidebar from "./components/Sidebar";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
function App() {
  return (
    <Router>
      <ToastContainer />
      
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>   
        <Route path = "/forgotPassword" element ={<ForgetPassword/>}></Route>
        <Route path = "/password/reset/:token" element={<ResetPassword/>}></Route>
        <Route path="/navbar" element={<Navbar/>} /> 
        <Route path="/navbarlogin" element ={<NavbarLogin/>}/>
        <Route path="/footer" element={<Footer/>}/>
        <Route path = "/" element={<HomePage/>}/>
        <Route path ="/adminDashboard" element= {<AdminDashboard/>}/>
        <Route path='/admin/edit/:id' element={<AdminEditProduct />} />
        <Route path='/admin/view/:id' element={<AdminView />} />
        <Route path="/sidebar" element={<Sidebar/>}/>
        <Route path="/about" element= {<About/>}/>
        <Route path="/contact" element = {<Contact/>}/>
            
      </Routes>
    </Router>
  );
}
export default App;