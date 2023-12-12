import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SidebarData } from './SidebarData';
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter is 'all'

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };

    fetchTasks();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleEdit = async (editedTask) => {
    try {
      // Send update request to the backend
      const response = await axios.put(`http://localhost:8080/api/tasks/${editedTask.id}`, editedTask);
      // Update the local state with the edited task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === editedTask.id ? response.data : task))
      );
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async (taskId) => {
    // Send delete request to the backend
    try {
      await axios.delete(`http://localhost:8080/api/tasks/delete/${taskId}`);
      // Remove the deleted task from the local state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleToggleStatus = async (taskId) => {
  try {
    await axios.patch(`http://localhost:8080/api/tasks/${taskId}/toggle-status`);

    // Update the local state with the toggled task status
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, complete: !task.complete } : task
      );

      // Check if the current filter is 'complete' and the task is now incomplete
      if (filter === 'complete' && !updatedTasks.find((task) => task.id === taskId).complete) {
        // Remove the task from the list of completed tasks
        return updatedTasks.filter((task) => task.id !== taskId);
      }

      // Check if the current filter is 'incomplete' and the task is now complete
      if (filter === 'incomplete' && updatedTasks.find((task) => task.id === taskId).complete) {
        // Remove the task from the list of incomplete tasks
        return updatedTasks.filter((task) => task.id !== taskId);
      }

      return updatedTasks;
    });
  } catch (error) {
    console.error('Error toggling task status', error);
  }
};

  const filteredTasks = () => {
    if (filter === 'all') {
      return tasks;
    } else if (filter === 'complete') {
      return tasks.filter((task) => task.complete);
    } else if (filter === 'incomplete') {
      return tasks.filter((task) => !task.complete);
    }
    return tasks;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ${JWT}',
        }
      });

      if (response.ok) {
        window.location.pathname = '/login';
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className='dashboard'>
      <h2>Dashboard</h2>
      <nav className='sidebar'>
        <ul className='sidebarList'>
        {SidebarData.map((val, key) => (
          <li className='row' key={key} onClick={() => setFilter(val.link)}>
              <div className='icon'>{val.icon}</div>
              <div className='title'>{val.title}</div>
          </li>
        ))}
        </ul>
        <button className='logout-button' type='submit' onClick={handleLogout}>
            <LogoutIcon /> Logout
          </button>
      </nav>
      <div className='task-container'>
        <h3>Task List</h3>
        <ul className='task-list'>
          {filteredTasks().map((task) => (
            <li className='task' key={task.id}>
              <strong>{task.name}</strong>
              <p>{task.description}</p>
              <p>Status: {task.complete ? 'Complete' : 'Incomplete'}</p>
              <button type="button" onClick={() => handleToggleStatus(task.id)}>
                Toggle Status
              </button>
              <button type="button" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button type="button" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
