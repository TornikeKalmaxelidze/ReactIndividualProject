import { useState, useEffect } from 'react'
import routes from '../../constants/routes'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

const NavLogo = ({ onLogoClick }) => {
  return (
    <div 
      className="navbar-brand d-flex align-items-center" 
      style={{ cursor: 'pointer' }} 
      onClick={onLogoClick}
    >
      <img
        src={logo}
        alt="Logo"
        className="img-fluid"
        style={{ 
          height: 'clamp(40px, 8vw, 60px)', 
          marginLeft: 'clamp(8px, 3vw, 20px)',
          maxWidth: '100%'
        }}
      />
    </div>
  )
}

const BurgerToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      className={`navbar-toggler d-xl-none border-0 p-2 ${isOpen ? 'collapsed' : ''}`}
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label="Toggle navigation"
      style={{ 
        fontSize: 'clamp(16px, 4vw, 20px)',
        minWidth: '44px',
        minHeight: '44px'
      }}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  )
}

const NavItem = ({ name, path, onClick, isMobile = false }) => {
  const buttonClass = isMobile 
    ? "btn btn-outline-light w-100 mb-2 mb-sm-3 text-start text-sm-center" 
    : "btn btn-outline-light mx-1 mx-lg-2"
  
  const buttonStyle = isMobile 
    ? { 
        fontSize: 'clamp(14px, 4vw, 16px)',
        padding: 'clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)',
        minHeight: '44px'
      }
    : { 
        fontSize: 'clamp(12px, 2.5vw, 14px)',
        padding: 'clamp(6px, 1.5vw, 8px) clamp(8px, 2vw, 16px)',
        whiteSpace: 'nowrap',
        minHeight: '40px'
      }
  
  return (
    <button
      onClick={() => onClick(path)}
      className={buttonClass}
      style={buttonStyle}
    >
      {name}
    </button>
  )
}

const DesktopNavMenu = ({ routes, onNavigate }) => {
  return (
    <div className="navbar-nav ms-auto d-none d-xl-flex flex-wrap justify-content-end">
      {routes.map((route) => {
        const [name, path] = route
        return (
          <NavItem
            key={path}
            name={name}
            path={path}
            onClick={onNavigate}
            isMobile={false}
          />
        )
      })}
    </div>
  )
}

const MobileNavMenu = ({ isOpen, routes, onNavigate, onClose }) => {
  return (
    <>
      <div 
        className={`offcanvas offcanvas-end bg-secondary ${isOpen ? 'show' : ''}`}
        tabIndex="-1" 
        id="mobileNavOffcanvas"
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'transform 0.3s ease-in-out',
          width: 'clamp(280px, 80vw, 350px)',
          maxWidth: '90vw'
        }}
      >
        <div className="offcanvas-header border-bottom border-light p-3 p-sm-4">
          <h5 className="offcanvas-title text-white mb-0" style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
            Menu
          </h5>
          <button 
            type="button" 
            className="btn-close btn-close-white" 
            onClick={onClose}
            aria-label="Close"
            style={{ 
              minWidth: '44px',
              minHeight: '44px',
              fontSize: 'clamp(16px, 4vw, 20px)'
            }}
          ></button>
        </div>
        <div className="offcanvas-body p-3 p-sm-4">
          <div className="d-flex flex-column">
            {routes.map((route) => {
              const [name, path] = route
              return (
                <NavItem
                  key={path}
                  name={name}
                  path={path}
                  onClick={onNavigate}
                  isMobile={true}
                />
              )
            })}
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          className="offcanvas-backdrop fade show"
          onClick={onClose}
          style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)' }}
        ></div>
      )}
    </>
  )
}

const useNavigation = () => {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleNavigate = (path) => {
    navigate(path)
    closeMobileMenu() 
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200 && isMobileMenuOpen) {
        closeMobileMenu()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    handleNavigate
  }
}

const NavBar = () => {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu, handleNavigate } = useNavigation()
  const appRoutes = Object.entries(routes)

  return (
    <>
      <nav 
        className="navbar navbar-expand-xl navbar-dark bg-dark fixed-top border-bottom"
        style={{ 
          height: 'clamp(60px, 12vw, 80px)',
          borderBottomColor: '#ccc !important',
          borderBottomWidth: '2px',
          minHeight: '60px'
        }}
      >
        <div className="container-fluid px-2 px-sm-3 px-lg-4">
          <NavLogo onLogoClick={() => handleNavigate('/')} />
          
          <DesktopNavMenu 
            routes={appRoutes} 
            onNavigate={handleNavigate} 
          />
          
          <BurgerToggle 
            isOpen={isMobileMenuOpen} 
            onToggle={toggleMobileMenu} 
          />
        </div>
      </nav>

      <MobileNavMenu 
        isOpen={isMobileMenuOpen}
        routes={appRoutes}
        onNavigate={handleNavigate}
        onClose={closeMobileMenu}
      />

      <style jsx>{`
        @media (max-width: 319px) {
          .navbar-brand img {
            height: 35px !important;
            margin-left: 5px !important;
          }
          .navbar {
            min-height: 55px !important;
          }
        }
        
        @media (min-width: 320px) and (max-width: 479px) {
          .offcanvas {
            width: 85vw !important;
          }
        }
        
        @media (min-width: 480px) and (max-width: 767px) {
          .offcanvas {
            width: 75vw !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 991px) {
          .offcanvas {
            width: 60vw !important;
          }
        }
        
        @media (min-width: 992px) and (max-width: 1199px) {
          .offcanvas {
            width: 400px !important;
          }
        }
        
        /* Touch target improvements for mobile */
        @media (max-width: 1199px) {
          .btn {
            min-height: 44px;
            min-width: 44px;
          }
        }
        
        /* Prevent horizontal scroll on very small screens */
        @media (max-width: 360px) {
          .container-fluid {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
        }
      `}</style>
    </>
  )
}

export default NavBar