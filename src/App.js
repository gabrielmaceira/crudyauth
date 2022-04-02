import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Admin } from './components/Admin';
import { UserProvider } from './context/UserContext';
import { RequireAuth } from './components/RequiresAuth';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login'
import { Register } from './components/Register'
import { LoadingProvider } from './context/LoadingContext';
import { AlreadyLoggedIn } from './components/AlreadyLoggedIn';
import './style.css';

export default function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<RequireAuth>  <LoadingProvider>  <Admin />  </LoadingProvider>  </RequireAuth>} />
          <Route path="/login" element={<AlreadyLoggedIn>  <Login />  </AlreadyLoggedIn>} />
          <Route path="/register" element={<AlreadyLoggedIn>  <Register />  </AlreadyLoggedIn>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
