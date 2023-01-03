
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Main from './pages/Main/Main';
import Wrapper from './layouts/Wrapper/Wrapper';
import Body from './layouts/Body/Body';
import SideMenu from './layouts/SideMenu/SideMenu';

function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/app' element={
      <Wrapper>
        <SideMenu />
        <Body>
        <Main />
        </Body>
        </Wrapper>
    }>
      </Route>
    </Routes>
  );
}

export default App;
