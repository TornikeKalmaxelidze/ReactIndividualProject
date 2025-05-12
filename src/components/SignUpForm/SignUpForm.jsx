import React, { useState } from 'react'
import auth from '../../api/AuthFetch';
import authAction from '../../constants/authAction';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';


const SignUpForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        userName: '',
        email: '',     
        password: '', 
    });
    
    const userHandler = (e) => {
        const { name, value } = e.target
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        auth(authAction.signUp, user)
            .then((data) => { console.log(data);
            
               navigate(routes.SignIn, {state: {succesee: true}});
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => { })
            ;
    }
    
    return (
        <form onSubmit={submitHandler}>
            <label>Username</label>
            <input 
                name='userName' 
                placeholder='Username' 
                onChange={userHandler} 
                value={user.userName}  
            />
            
            <label>Email</label>
            <input 
                name='email' 
                placeholder='Email' 
                onChange={userHandler} 
                value={user.email}     
            />
            
            <label>Password</label>
            <input 
                name='password' 
                type="password"      
                placeholder='Password' 
                onChange={userHandler} 
                value={user.password} 
            />
            
            <button type='submit'>Submit</button>
        </form>
    )
}

export default SignUpForm;