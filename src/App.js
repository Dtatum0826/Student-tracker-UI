
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import { isAuthenticated } from './utils/AuthService';

const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
    />
  );
};

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
   </BrowserRouter>
  );
};

export default App;