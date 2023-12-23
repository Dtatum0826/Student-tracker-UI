
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, redirect   } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import { isAuthenticated } from './utils/AuthService';
import Dashboard from './Components/Dashboard';
const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/" />}
    />
  );
};

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
   </BrowserRouter>
  );
};

export default App;