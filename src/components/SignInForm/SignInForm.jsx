import React, { useState } from 'react'
import auth from '../../api/AuthFetch'
import authAction from '../../constants/authAction'
import { useAppContext } from '../../context/AppContextProvaider'
import { LogInAction } from '../../context/actionCreator'
import { useNavigate } from 'react-router-dom'
import routes from '../../constants/routes'
import background2 from '../../assets/background2.png';


const SignInForm = () => {
    const { dispatch } = useAppContext();
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
        <div
            className="background-image w-100 h-100 bg-light"
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
                filter: 'brightness(0.9) contrast(1.1)',
                animation: 'fadeIn 1.5s ease-in-out',
            }}
        >
            <div className="row min-vh-100">
                <div className="col-md-4 offset-md-1 d-flex align-items-center">
                    <div className="card shadow-lg w-100 bg-secondary bg-opacity-10" style={{
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '15px'
                      }}>
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4 text-secondary text-white">Sign In</h3>
                            {user.error && (
                                <div className="alert alert-danger" role="alert">
                                    {user.error}
                                </div>
                            )}
                            <form onSubmit={submitHandler}>
                                <div className="mb-3">
                                    <label className="form-label text-secondary text-white">Email</label>
                                    <input
                                        type="email"
                                        className="form-control bg-light"
                                        name="email"
                                        placeholder="Enter your email"
                                        onChange={userHandler}
                                        value={user.email}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label text-secondary text-white">Password</label>
                                    <input
                                        type="password"
                                        className="form-control bg-light"
                                        name="password"
                                        placeholder="Enter your password"
                                        onChange={userHandler}
                                        value={user.password}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-secondary w-100 "
                                    disabled={user.isLoading}
                                >
                                    {user.isLoading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignInForm;