import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContextProvaider';
import SignInForm from '../../components/SignInForm/SignInForm';

const SignIn = () => {
  const {state, dispatch} = useAppContext()
  const location = useLocation();
  console.log(state, dispatch);

  
  return (
    <div>
      <div> 
       <h1>SignIn</h1>
       {location.state?.succesee && <p>SignUp successfully</p>}
       <SignInForm/>
      </div>
      
    </div>
  )
}

export default SignIn
