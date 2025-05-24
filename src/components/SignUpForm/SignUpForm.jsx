import React, { useState } from 'react'
import auth from '../../api/AuthFetch';
import authAction from '../../constants/authAction';
import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import background2 from '../../assets/background2.png';



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
            .then((data) => {
                console.log(data);
                navigate(routes.SignIn, { state: { succesee: true } });
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => { });
    }

    return (
        <div className='row min-vh-100'>
            <div className="col-md-4 offset-md-1 d-flex align-items-center">
                <div className="background-image w-100 h-100 bg-light"
                    style={{
                        backgroundImage: `url(${background2})`,
                        transition: 'all 0.8s ease-in-out',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: '100vw',
                        height: '100vh',
                        backdropFilter: 'blur(10px)',

                        filter: 'brightness(0.9) contrast(1.1)',
                        animation: 'fadeIn 1.5s ease-in-out',
                        zIndex: -1,
                    }}>

                </div>
                <div className='card shadow-lg w-100 bg-secondary bg-opacity-10 p-4' style={{
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                    borderRadius: '15px'
                }}>


                    <h2 className="text-white mb-4 display-6">Sign Up</h2>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label className="form-label text-white">Email</label>
                            <input
                                className="form-control"
                                name='email'
                                placeholder='Enter your email'
                                onChange={userHandler}
                                value={user.email}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white">Username</label>
                            <input
                                className="form-control"
                                name='userName'
                                placeholder='Enter your username'
                                onChange={userHandler}
                                value={user.userName}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label text-white">Password</label>
                            <input
                                className="form-control"
                                name='password'
                                type="password"
                                placeholder='Enter your password'
                                onChange={userHandler}
                                value={user.password}
                            />
                        </div>

                        <button
                            type='submit'
                            className="btn btn-secondary w-100 mt-3"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;