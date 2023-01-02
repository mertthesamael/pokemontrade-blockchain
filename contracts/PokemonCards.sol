// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';


contract PokemonCards is ERC721URIStorage, Ownable {
    
      uint public totalSupply;
    uint public maxSupply;
    bool public isMintEnabled;
    uint[] public hasTokenId;
    
    // Mapping for amount of minted nfts by an address
    mapping(address => uint256) public mintedWallets;
    mapping(address => uint[]) public ownedNfts;


    constructor() payable ERC721('Pokemon Card', 'POKE') {
        maxSupply = 20;
    }
    
    function toggleIsMintEnabled() external onlyOwner {
        isMintEnabled = !isMintEnabled;
    }

    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        maxSupply = _maxSupply;
    }

  

    function mint(string memory tokenURI) external payable {
        // require(isMintEnabled,"Minting is not enable");
       // require(mintedWallets[msg.sender] < 1, 'You have reached maximum mint number');
       
        require(maxSupply > totalSupply, "Sold Out ! ");
        mintedWallets[msg.sender]++;
        totalSupply++;
        uint256 tokenId = totalSupply;
        ownedNfts[msg.sender].push(tokenId);
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId,tokenURI);

    }

    function getAll(address _addr) public view returns (uint[] memory) {
    return ownedNfts[_addr];
    }

}