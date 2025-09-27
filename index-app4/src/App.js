import './App.css';
import Nav from './components/nav'
import Player from './components/player'
import Info from './components/info'
import {Routes,Route} from 'react-router-dom'
import Farmer from './components/farmerlog'
import Home from './components/home'

function App() {
  return (
    <>
    <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/farmlog" element={<Farmer/>}/>
    </Routes>
    </>
  );
}

export default App;
