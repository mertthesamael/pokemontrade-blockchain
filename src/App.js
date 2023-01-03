
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Main from './pages/Main/Main';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/app' element={<Main />}></Route>
    </Routes>
  );
}

export default App;
