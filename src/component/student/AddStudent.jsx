import axios from 'axios';
import React, { useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import tryAgainImg from '../../images/try-again.jpg'

function AddStudent() {
    const navigate = useNavigate()
    const [student,setStudent] = useState({
        firstName:"",
        lastName:"",
        age:"",
        email:"",
        dept:""
    })
    
    const{firstName,lastName,age,email,dept} = student

    const [alreadyExists,setAlreadyExists] = useState("");

    const handleInputChange = (e) => {
		setStudent({
			...student,
			[e.target.name]: e.target.value,
		});
	};

    const saveStudent=async (e)=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:7080/students/add",student)
            navigate('/viewAllStudents')
        }
        catch(err){
            console.log(err.response.data.message);
            setAlreadyExists(err.response.data.message);
        }
    }

  return (
    <div className="col-sm-8 py-3 px-5 offset-2 shadow">
    {
        alreadyExists != ""? 
            <div> 
                <h4>{alreadyExists} try again!</h4> 
                <img src={tryAgainImg} alt="try again" />
            </div>
        : 
    <form onSubmit={(e)=>saveStudent(e)}>
        <h4 className="mt-2"> Add Student</h4>
        <div className="input-group">
            <label
                className="input-group-text"
                htmlFor="fristName">
                First Name
            </label>
            <input
                className="form-control"
                type="text"
                name="firstName"
                id="firstName"
                required
                value={firstName}
                onChange={(e) => handleInputChange(e)}
            />
        </div>

        <div className="input-group">
            <label
                className="input-group-text"
                htmlFor="lastName">
                Last Name
            </label>
            <input
                className="form-control"
                type="text"
                name="lastName"
                id="lastName"
                required
                value={lastName}
                onChange={(e) => handleInputChange(e)}
            />
        </div>

        <div className="input-group">
            <label
                className="input-group-text"
                htmlFor="age">
                Age
            </label>
            <input
                className="form-control"
                type="number"
                name="age"
                id="age"
                required
                value={age}
                onChange={(e) => handleInputChange(e)}
            />
        </div>

        <div className="input-group">
            <label
                className="input-group-text"
                htmlFor="email">
                Your Email
            </label>
            <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => handleInputChange(e)}
            />
        </div>

        <div className="input-group mb-3">
            <label
                className="input-group-text"
                htmlFor="dept">
                Department
            </label>
            <input
                className="form-control "
                type="text"
                name="dept"
                id="department"
                required
                value={dept}
                onChange={(e) => handleInputChange(e)}
            />
        </div>

        <div className="row">
            <div className="col-sm-2">
                <button
                    type="submit"
                    className="btn btn-outline-success">
                    Save
                </button>
            </div>

            <div className="col-sm-2">
                <Link
                    to={"/viewAllStudents"}
                    type="submit"
                    className="btn btn-outline-warning">
                    Cancel
                </Link>
            </div>
        </div>
    </form>
    }
</div>
  )
}

export default AddStudent
