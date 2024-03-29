import './App.css';
import StudentsView from './component/student/StudentsView';
import Home from './component/Home/Home';
import Navbar from './component/common/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import AddStudent from './component/student/AddStudent';
import StudentProfile from './component/student/StudentProfile';
import EditStudent from './component/student/EditStudent';
import Footer from './component/Home/Footer';

function App() {
  return (
    <main id="wallpaper" >
      
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/viewAllStudents" element={<StudentsView/>}></Route>
          <Route exact path='/addStudents' element={<AddStudent/>}></Route>
          <Route path='/profile/:id' element={<StudentProfile/>}></Route>
          <Route path='/edit/:id' element={<EditStudent/>}></Route>
        </Routes>
        <Footer/>
      </Router>
      
      
    </main>
  );
}

export default App;
