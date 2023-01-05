
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
import MobileSideMenu from './layouts/MobileSideMenu/MobileSideMenu';
import PopupWrapper from './layouts/PopupWrapper/PopupWrapper';

function App() {

  return (

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/app' element={
        <Wrapper>
        <SideMenu />
        <Body>
        <Main />
        <PopupWrapper />
        </Body>
        </Wrapper>
    }>
      </Route>

      <Route path='/mynft' element={
        <Wrapper>
        <SideMenu />
        <Body>

        <MyNft />
        <PopupWrapper />

        </Body>
        </Wrapper>
    }>
      </Route>

      <Route path='/trades' element={
        <Wrapper>
        <SideMenu />
        <Body>

        <OpenTrades />
        <PopupWrapper />

        </Body>
        </Wrapper>
    }>
      </Route>
      <Route path='/trade' element={
        <Wrapper>
        <SideMenu />
        <Body>

        <CreateTrade />
        <PopupWrapper />

        </Body>
        </Wrapper>
    }>
      </Route>
      <Route path='/mytrade' element={
        <Wrapper>
        <SideMenu />
        <Body>

        <MyTrade />
        <PopupWrapper />

        </Body>
        </Wrapper>
    }>
      </Route>
    </Routes>
  );
}

export default App;
