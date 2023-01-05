
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Main from './pages/Main/Main';
import Wrapper from './layouts/Wrapper/Wrapper';
import Body from './layouts/Body/Body';
import SideMenu from './layouts/SideMenu/SideMenu';
import MyNft from './pages/MyNft/MyNft';
import OpenTrades from './pages/OpenTrades/OpenTrades';
import CreateTrade from './pages/CreateTrade/CreateTrade';
import MyTrade from './pages/MyTrade/MyTrade';

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

      <Route path='/mynft' element={
        <Wrapper>
        <SideMenu />
        <Body>
        <MyNft />
        </Body>
        </Wrapper>
    }>
      </Route>

      <Route path='/trades' element={
        <Wrapper>
        <SideMenu />
        <Body>
        <OpenTrades />
        </Body>
        </Wrapper>
    }>
      </Route>
      <Route path='/trade' element={
        <Wrapper>
        <SideMenu />
        <Body>
        <CreateTrade />
        </Body>
        </Wrapper>
    }>
      </Route>
      <Route path='/mytrade' element={
        <Wrapper>
        <SideMenu />
        <Body>
        <MyTrade />
        </Body>
        </Wrapper>
    }>
      </Route>
    </Routes>
  );
}

export default App;
