import React, { useState } from 'react'
import auth from '../../api/AuthFetch'
import authAction from '../../constants/authAction'
import { useAppContext } from '../../context/AppContextProvaider'
import { LogInAction } from '../../context/actionCreator'
import { useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'

const SignInForm = () => {
    const {dispatch} = useAppContext();
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
        error: "",
        isLoading: false,  
    })
    
    const userHandler = (e) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }));
    }
    
    const submitHandler = (e) => {
        e.preventDefault() 
        setUser((prev) => ({ ...prev, isLoading: true }))
        
        auth(authAction.signIn, { email: user.email, password: user.password })  
            .then((data) => {
                dispatch(LogInAction(data));
                navigate(routes.Products)
            })
            .catch((err) => {
                setUser((prev) => ({ ...prev, error: err.message }))  
            })
            .finally(() => {
                setUser((prev) => ({
                    ...prev, isLoading: false
                }))
            })
    }
    
    return (
        <form onSubmit={submitHandler}>
            <label>Email</label>
            <input 
                type="email" 
                name="email"  
                placeholder='email' 
                onChange={userHandler}  
                value={user.email}  
            />
            
            <label>Password</label>
            <input 
                type="password" 
                name="password"  
                placeholder='password' 
                onChange={userHandler}  
                value={user.password}  
            />
           <button type='submit' >Submit</button> 
           
        </form>
    )
}

export default SignInForm;