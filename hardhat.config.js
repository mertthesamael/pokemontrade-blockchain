require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: "./src"
  },
  networks:{
    matic:{
      url:"https://rpc-mumbai.maticvigil.com",
      //Well this is the test account, feel free to stole it lol xD
      accounts:[process.env.REACT_APP_PRIVATEKEY]
    }
  }
};