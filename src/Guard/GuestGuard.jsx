import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContextProvaider'
import routes from '../constants/routes'

const GuestGuard = ({ children }) => {
  const { state } = useAppContext();
  const navigate = useNavigate();

  if (!state.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You do not have permission to access this page.</p>
        <button onClick={() => navigate(routes.SignUp)}>SignUp</button>
        <button onClick={() => navigate(routes.SignIn)}>SignIn</button>
      </div>
    );
    
  }
  return (
    <>
      {children}
    </>
  );
};

export default GuestGuard;
