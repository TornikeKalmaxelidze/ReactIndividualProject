import routes from '../../constants/routes'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

const AppRoutes = Object.entries(routes)
const NavBar = () => {
  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ height: '80px', position: 'fixed', width: '100%', zIndex: 1000, borderBottom: '2px solid #ccc' }}>
      <div className="container-fluid">
        <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: '60px', marginLeft: '20px' }}
          />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            {AppRoutes.map((route) => {
              const [name, path] = route
              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className="btn btn-outline-light mx-2 my-2"
                >
                  {name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
export default NavBar;
