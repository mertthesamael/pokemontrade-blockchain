import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Main from "./pages/Main/Main";
import Wrapper from "./layouts/Wrapper/Wrapper";
import Body from "./layouts/Body/Body";
import Navigation from "./layouts/Navigation/Navigation";
import MyNft from "./pages/MyNft/MyNft";
import OpenTrades from "./pages/OpenTrades/OpenTrades";
import CreateTrade from "./pages/CreateTrade/CreateTrade";
import MyTrade from "./pages/MyTrade/MyTrade";
import MobileMenu from "./layouts/MobileMenu/MobileMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route
        path="/app"
        element={
          <Wrapper>
            <MobileMenu />
            <Navigation />
            <Body>
              <Main />
            </Body>
          </Wrapper>
        }
      ></Route>

      <Route
        path="/mynft"
        element={
          <Wrapper>
            <MobileMenu />

            <Navigation />
            <Body>
              <MyNft />
            </Body>
          </Wrapper>
        }
      ></Route>

      <Route
        path="/trades"
        element={
          <Wrapper>
            <MobileMenu />

            <Navigation />
            <Body>
              <OpenTrades />
            </Body>
          </Wrapper>
        }
      ></Route>
      <Route
        path="/trade"
        element={
          <Wrapper>
            <MobileMenu />

            <Navigation />
            <Body>
              <CreateTrade />
            </Body>
          </Wrapper>
        }
      ></Route>
      <Route
        path="/mytrade"
        element={
          <Wrapper>
            <MobileMenu />

            <Navigation />
            <Body>
              <MyTrade />
            </Body>
          </Wrapper>
        }
      ></Route>
    </Routes>
  );
}

export default App;
