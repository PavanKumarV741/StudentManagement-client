import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'


function StudentProfile() {
    const {id} = useParams();

    const [student,setStudent] = useState({
        firstName:"",
        lastName:"",
        email:"",
        dept:""
    })
    const [notFound,setNotFound] = useState("")

   useEffect(()=>{
        loadStudent();
   },[])

    const loadStudent =async () =>{
        try{
            const result = await axios.get(`http://localhost:7080/students/getById/${id}`);
            // console.log(result.data)
            setStudent(result.data)
        }
        catch(err){
            // console.log(err.response.data.message)
            setNotFound(err.response.data.message)
        }
    }

  return (
    <div className="card">
  {/* <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="card-img-top" alt="profile" width={100} height={300}/> */}
  {
    student.firstName ? 
    <div className="card-body">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile" height={250}/>
        <h6>Firstname : {student.firstName}</h6>
        <h6>LastName : {student.lastName}</h6>
        <h6>Age : {student.age}</h6>
        <h6>email : {student.email}</h6>
        <h6>dept : {student.dept}</h6>
    </div>
    :
    <h2>{notFound}</h2>
  }
</div>
  )
}

export default StudentProfile
