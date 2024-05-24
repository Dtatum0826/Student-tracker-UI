import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/AuthService';
import StudentService from '../services/StudentService';

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({
    studentId: '',
    nameToChange: '',
    periodToChange: '',
    gradeToChange: '',
  });
  const [addNewStudentFormVisible, setAddNewStudentFormVisible] = useState(false);
  const [addStudentFormData, setAddStudentData] = useState({
    name: '',
    period: '',
    grade: ''
  })

  useEffect(() => {
    const fetchStudents = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_ENDPOINT + ':5000/teacher/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch student data. Status: ${response.status}`);
    }

    const data = await response.json();
    setStudents(data);
  } catch (error) {
    console.error('Error fetching student data:', error.message);
  }
};

    fetchStudents();
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/" />;
  }

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Setting ${name} to ${value}`);
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEdit = (student) => {
    setEditFormData({
      studentId: student.studentId,
      nameToChange: student.name,
      periodToChange: student.period,
      gradeToChange: student.grade
    });
    setShowEditForm(true);
  };

  const handleEditSubmit = async () => {
    try {
      console.log('Submitted edit');
      const token = localStorage.getItem('jwt');
      await StudentService.editStudent(token, editFormData, setStudents);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error handling edit submit:', error);
    }
  };

  const handleDelete = async (studentId) => {
    try {
      const token = localStorage.getItem('jwt');
      await StudentService.deleteStudent(token, studentId, students, setStudents);
    } catch (error) {
      console.error('Error handling delete:', error);
    }
  };

  const handleFormClose = () => {
    setShowEditForm(false);
  };
  const handleAddStudentFormClose = () => {
    setAddNewStudentFormVisible(false);
  }

  const HandleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('teacher_name');
    navigate("/");
  }

  const handleAddStudent = async () => {
    try {
      const token = localStorage.getItem('jwt');
      await StudentService.addNewStudent(token, addStudentFormData, setStudents);
      setAddNewStudentFormVisible(false);
    } catch (error) {
      console.error('Error Adding new student', error);
    }
  }

  const handleAddStudentFormToggle = () => {
    setAddNewStudentFormVisible(!addNewStudentFormVisible);
  };

  const handleAddStudentInputChange = (e) => {
    const { name, value } = e.target;
    setAddStudentData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEmailRedirect = () => {
    navigate('/verify-email');
  };

  const handleAssignmentWindowChange = (studentId) => {
    localStorage.setItem('student_id', studentId)
    navigate('/assignments');
  }

  return (
    <div className="dashboard-container">
      <div>
        <button className='email-button' onClick={handleEmailRedirect}>email verification</button>
        <button className='add-button' onClick={handleAddStudentFormToggle}>Add Student</button>
        <button className='logout-button' onClick={HandleLogout}>Logout</button>
      </div>
      {addNewStudentFormVisible && (
        <div className="add-student-form">
          <h3>Add New Student</h3>
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={addStudentFormData.name}
              onChange={handleAddStudentInputChange}
              pattern="[A-Za-z\s]+"
              required
            />
          </label>
          <label>
            Period:
            <input
              type="number"
              name="period"
              value={addStudentFormData.period}
              onChange={handleAddStudentInputChange}
              pattern="\d*"
              required
            />
          </label>
          <label>
            Grade:
            <input
              type="text"
              name="grade"
              value={addStudentFormData.grade}
              onChange={handleAddStudentInputChange}
              pattern="\d*\.?\d*"
              required
            />
          </label>
          <button className='add-button' onClick={handleAddStudent}>Submit</button>
          <button className='close-add-button' onClick={handleAddStudentFormClose}>Close</button>
        </div>
      )}
      <h2>Welcome {localStorage.getItem('teacher_name')}</h2>
      <h3>Your Student List:</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Period</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td><button onClick={() => handleAssignmentWindowChange(student.studentId)}>{student.name}</button></td>
              <td>{student.period}</td>
              <td>{student.grade}</td>
              <td>
                <button className='edit-button' onClick={() => handleEdit(student)}>Edit</button>
                <button className='delete-button' onClick={() => handleDelete(student.studentId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditForm && (
        <div className="edit-form">
          <h3>Edit Student</h3>
          <label>
            Full Name:
            <input
              type="text"
              name="nameToChange"
              value={editFormData.nameToChange}
              onChange={handleEditInputChange}
              pattern="[A-Za-z\s]+"
            />
          </label>
          <label>
            Period:
            <input
              type="number"
              name="periodToChange"
              value={editFormData.periodToChange}
              onChange={handleEditInputChange}
              pattern="\d*"
            />
          </label>
          <label>
            Grade:
            <input
              type="text"
              name="gradeToChange"
              value={editFormData.gradeToChange}
              onChange={handleEditInputChange}
              pattern="\d*\.?\d*"
            />
          </label>
          <button className='edit-button' onClick={handleEditSubmit}>Submit</button>
          <button className='submit-button' onClick={handleFormClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;