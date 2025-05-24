import './App.css';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <div className="min-h-screen w-full">
      <NavBar/>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AppRoutes/>
      </div>
    </div>
  );
}

export default App;
