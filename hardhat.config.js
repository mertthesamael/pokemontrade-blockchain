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
      accounts:['e65b65dc0c982bb358aa400df9ca39f6045fc23660340bd17c37778249618a54']
    }
  }
};