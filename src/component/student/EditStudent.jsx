import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {Link,useNavigate} from 'react-router-dom'

function EditStudent() {
   const {id} = useParams();
    
   const navigate = useNavigate()

   const [student,setStudent] = useState({
    image:null,
    firstName:"",
    lastName:"",
    age:"",
    email:"",
    dept:"",
    fileName:""
   })

   const {firstName,lastName,age,email,dept,image} = student;

   useEffect(()=>{
        loadStudentById()
   },[])

   const loadStudentById= async ()=>{
    const result = await axios.get(`http://localhost:7080/students/getById/${id}`)
        try{
            console.log(result.data)
            setStudent(result.data)
        }
        catch(err){
            console.log(result.data)
        }
   }

   const handleInputChange = (e) =>{
        e.preventDefault()
        setStudent({...student,
            [e.target.name] : e.target.value
        })
        console.log(student)
   }
   
   const handleInputFile = (e) =>{
    setStudent({...student,
            image : e.target.files[0]
        })
   }

   const handleUpdate = async () =>{
        const formData = new FormData();
        formData.append("file",image);
        formData.append("firstName",student.firstName);
        formData.append("lastName",student.lastName);
        formData.append("age",student.age);
        formData.append("email",student.email);
        formData.append("dept",student.dept)

        await axios.put(`http://localhost:7080/students/update/${id}`,formData);
        navigate(`/profile/${id}`)
   }

  return (
    <div className='container'>
        <div style={{textAlign:"center"}}>
            <h4>EditStudent</h4>
        </div>
      <form>
        <div className="mb-3 row">
            <label className="col-sm-2 mb-2  col-form-label">FirstName</label>
            <div className="col-sm-10">
                <input 
                type="text" 
                className="form-control" 
                name="firstName" 
                onChange={handleInputChange}
                value={firstName}/>
            </div>

            <label className="col-sm-2 mb-2 col-form-label">LastName</label>
            <div className="col-sm-10">
                <input type="text" 
                className="form-control" 
                name="lastName"
                onChange={handleInputChange} 
                value={lastName}/>
            </div>

            <label className="col-sm-2 mb-2 col-form-label">Age</label>
            <div className="col-sm-10">
                <input type="number" 
                className="form-control" 
                name="age"
                onChange={handleInputChange} 
                value={age}/>
            </div>

            <label className="col-sm-2  mb-2  col-form-label">Email</label>
            <div className="col-sm-10">
                <input 
                type="text" 
                className="form-control" 
                name="email" 
                onChange={handleInputChange}
                value={email}/>
            </div>

            <label className="col-sm-2 mb-2  col-form-label">DepartMent</label>
            <div className="col-sm-10">
                <input type="text" 
                className="form-control" 
                name="dept" 
                onChange={handleInputChange}
                value={dept}/>
            </div>

            <label className="col-sm-2 mb-2  col-form-label">profile</label>
            <div className="col-sm-10">
                <input type="file" 
                className="form-control" 
                name="image"
                onChange={(e)=>handleInputFile(e)}
                />
            </div>

        </div>
      </form>
        <div style={{textAlign:"center",display:"flex", justifyContent:"space-around",}}>
            <input  className="btn btn-outline-success" type="button" value="Update" onClick={handleUpdate}/>
            <Link to="/viewAllStudents"><input className="btn btn-outline-danger" type="button" value="Cancel"/></Link> 
        </div>
    </div>
  )
}

export default EditStudent
