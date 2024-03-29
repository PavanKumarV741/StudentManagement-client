import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';

function StudentsView() {
    var count = 0;
    const [students,setStudents] = useState([])
    const [field,setField] = useState("")
    const [name,setName] = useState("");

    useEffect(()=>{
        loadStudents();
    },[field])

    const loadStudents= async ()=>{
        if(field === ""){
          const result = await axios.get(`http://localhost:7080/students/get`);
            // console.log(result.data)
            setStudents(result.data)
        }
        else{
            const res = await axios.get(`http://localhost:7080/students/sortByField/${field}`);
            setStudents(res.data)
        }
    }

    const deleteStudent =async (id)=>{
        await axios.delete(`http://localhost:7080/students/delete/${id}`)
        loadStudents();
    }

    const handleSearch = (e) =>{
        e.preventDefault()
        // console.log(e.target.value)
        setName(e.target.value)
    }

    const handleSort = (e) =>{
        console.log(e.target.value)
        setField(e.target.value)
    }

  return (
    
    <section className='container'>

      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
        <select name="field" value={field} onChange={handleSort}>
            <option value="">SortBy</option>
            <option value="firstName">FirstName</option>
            <option value="lastName">LastName</option>
            <option value="age">Age</option>
            <option value="email">Email</option>
            <option value="dept">Department</option>
        </select>
      </form>
      <table className="table table-success table-striped">
        <thead>
            <tr>
                <th>Index</th>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Age</th>
                {/* <th>Email</th> */}
                {/* <th>Department</th> */}
                <th>view</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {students.filter((student)=> name.toLowerCase() === "" ? student : student.firstName.toLowerCase().includes(name)).map((student)=>
                <tr key={student.id}>
                    <td>{++count}</td>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.age}</td>
                    {/* <td>{student.email}</td> */}
                    {/* <td>{student.dept}</td> */}
                    
                    <td>
                        <Link to={`/profile/${student.id}`}><button className="btn btn-info"><FaEye/></button></Link>
                    </td>
                    <td>
                        <Link to={`/edit/${student.id}`}><button className="btn btn-warning mr-2"><MdOutlineEdit /></button></Link>
                    <button className="btn btn-danger" onClick={()=>deleteStudent(student.id)}><MdOutlineDeleteOutline/></button></td>
                </tr>
            )}

            {name !== "" && students.filter((student) => !student.firstName.toLowerCase().includes(name)).length === students.length && (
                    <tr>
                        <td colSpan="6" className="text-center">No matching records found</td>
                    </tr>
                )}
        </tbody>

      </table>

    </section>
  )
}

export default StudentsView
