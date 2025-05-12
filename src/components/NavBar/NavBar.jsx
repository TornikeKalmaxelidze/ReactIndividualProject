import React from 'react'
import routes from '../../constants/routes'
import { useNavigate } from 'react-router-dom'


const AppRoutes = Object.entries(routes)

const NavBar = () => {
   const navigate = useNavigate()
  return (
    <nav>
        {AppRoutes.map((route) => {
            const [name, path] = route
            return (
                <button key={path} onClick={() => navigate(path)}>{name}</button>
            )
        })}
               
    </nav>
  )
}
export default NavBar;
