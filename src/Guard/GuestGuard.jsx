import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContextProvaider'
import routes from '../constants/routes'


const GuestGuard = ({ children }) => {
  const { state } = useAppContext();
  const navigate = useNavigate();

  // if (!state.isAuthenticated) {
  //   return (
  //     <>
  //       <div className="container">
  //         <div
  //           className="background-image w-100 h-100"
  //           style={{
  //             backgroundColor: '#4a4a4a',
  //             transition: 'all 0.8s ease-in-out',
  //             position: 'fixed',
  //             top: 0,
  //             left: 0,
  //             right: 0,
  //             bottom: 0,
  //             width: '100vw',
  //             height: '100vh',
  //             filter: 'brightness(0.9) contrast(1.1)',
  //             animation: 'fadeIn 1.5s ease-in-out',
  //           }}>
  //           <div className="d-flex justify-content-center align-items-center">
  //             <h3 className="m-0 fw-bold text-white">Access Control</h3>
  //           </div>
  //         </div>
  //         <div className="container text-center" style={{
  //           paddingTop: '200px'
  //         }}>
  //           <div className="alert p-5 shadow rounded-4" style={{ backgroundColor: '#333333', color: 'white' }}>
  //             <h1 className="mb-4 fw-bold">Access Denied</h1>
  //             <p className="mb-4 fs-5">You do Not Have Permission to Access This Page Please.</p>
  //             <div className="d-flex justify-content-center gap-3">
  //               <button
  //                 className="btn btn-light btn-lg shadow-sm"
  //                 onClick={() => navigate(routes.SignUp)}
  //               >
  //                 Sign Up
  //               </button>
  //               <button
  //                 className="btn btn-outline-light btn-lg"
  //                 onClick={() => navigate(routes.SignIn)}
  //               >
  //                 Sign In
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }
  return (
    <>
      {children}
    </>
  );
};

export default GuestGuard;
