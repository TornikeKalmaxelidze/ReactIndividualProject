import './App.css';
import AppRoutes from './AppRoutes';
import NavBar from './components/NavBar/NavBar';


function App() {
  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column',gap: "10px"  ,alignItems: 'center'}}>
      <NavBar/>
      <AppRoutes/>
    </div>
  );
}

export default App;
