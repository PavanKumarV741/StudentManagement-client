import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'


function StudentProfile() {
    const { id } = useParams();
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dept: "",
        fileName: "",
        age: ""
    });
    const [notFound, setNotFound] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {
        try {
            const result = await axios.get(`http://localhost:7080/students/getById/${id}`);
            setStudent(result.data);
            setLoading(false);
        } catch (err) {
            setNotFound(err.response.data.message);
        }
    };

    return (
        <div className="card">
            {loading ? (
                <div>Loading...</div>
            ) : student.firstName ? (
                <div className="card-body">
                    <div className="profile_img">
                        {/* Use data URL with base64-encoded image data */}
                        <img src={`http://localhost:7080/students/getByFileName/${student.fileName}`} alt="profile" className='img' height={250} />
                    </div>
                    <div className="profile_detail">
                        <h6>FirstName: {student.firstName}</h6>
                        <h6>LastName: {student.lastName}</h6>
                        <h6>Age: {student.age}</h6>
                        <h6>Email: {student.email}</h6>
                        <h6>Dept: {student.dept}</h6>
                    </div>
                </div>
            ) : (
                <h2>{notFound}</h2>
            )}
        </div>
    );
}

export default StudentProfile;
