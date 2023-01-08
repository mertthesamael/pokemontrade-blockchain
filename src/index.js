import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextWrapper } from "./store/context";
import { LayoutContextWrapper } from "./store/layoutContext";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider,darkTheme,mdarkTheme } from "@rainbow-me/rainbowkit";
import { wagmiClient,chains } from "./config/rainbowkit";
const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient();
root.render(
  <BrowserRouter>
      <WagmiConfig client={wagmiClient}>
  <RainbowKitProvider  theme={darkTheme()} chains={chains}>

    <QueryClientProvider client={client}>

      <LayoutContextWrapper>
        <UserContextWrapper>
          <ChakraProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ChakraProvider>
        </UserContextWrapper>
      </LayoutContextWrapper>
    </QueryClientProvider>
  </RainbowKitProvider>
      </WagmiConfig>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
