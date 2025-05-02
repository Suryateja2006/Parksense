import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/FacultyLogin';
import Register from './components/FacultyRegister';
import Dashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegsiter';
import StudentDashboard from './components/Studentdashboard';
function App() {
  return (
    <Router>
      <div className="bg-[#121212] min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/customerdashboard" element={<Dashboard />} />
          <Route path = "/admin-dashboard" element = {<AdminDashboard/>} />
          <Route path = "/admin-login" element = {<AdminLogin/>}/>
          <Route path = "/studentlogin" element = {<StudentLogin/>}/>
          <Route path = "/student-register" element = {<StudentRegister/>}/>
          <Route path = "/student-dashboard" element = {<StudentDashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
