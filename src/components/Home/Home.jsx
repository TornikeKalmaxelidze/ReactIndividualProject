import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background3 from '../../assets/background3.png';
import background2 from '../../assets/background2.png';
import background1 from '../../assets/background1.png';
import background4 from '../../assets/background4.png';
import routes from '../../constants/routes';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const backgroundImages = [background1, background2, background3, background4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="min-vh-100 position-relative" style={{ overflow: 'hidden' }}>
      <div
        className="background-image w-100 h-100"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          transition: 'background-image 0.5s ease-in-out',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          filter: 'blur(2px)'
        }}
      />
      <div
        className="text-overlay position-absolute text-center text-white p-4 w-100"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}
      >
        <h1
          className="mb-4"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            letterSpacing: '2px',
            fontWeight: 'bold'
          }}
        >
          Welcome to Our Bookshop
        </h1>
        <p
          className="lead mb-4"
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontStyle: 'italic'
          }}
        >
          Discover Your Next Favorite Story
        </p>
        <button
          className="btn btn-lg"
          onClick={() => navigate(routes.Products)}
          style={{
            backgroundColor: 'white',
            color: '#333',
            padding: 'clamp(8px, 2vw, 12px) clamp(20px, 4vw, 30px)',
            borderRadius: '25px',
            fontWeight: 'bold',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          Discover Here
        </button>
      </div>
    </div>
  );
};

export default Home;
