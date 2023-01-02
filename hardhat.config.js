require("@nomicfoundation/hardhat-toolbox");

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
      accounts:['fb7d0b0a580a988a718575f9aea416fed685be0f3634900f7f466833b5fb6700']
    }
  }
};