// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '../node_modules/@openzeppelin/contracts/access/Ownable.sol';
import '../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';


contract PokemonCards is ERC721URIStorage, Ownable {
  
    /***************** MINT SEQUENCE ****************/

    event Minted(address indexed _signer, uint indexed _id);
    uint public totalSupply;
    uint public maxSupply;

    mapping(address => mapping(uint256 => uint256)) private _ownedTokens;
    // Mapping for amount of minted nfts by an address
    mapping(address => uint256) public mintedWallets;

    //This variabla manually tracks ID's of tokens that user holds. It does not count transferred tokens, but traded ones. Maybe this'll be uptaded idk...
    mapping(address => uint[]) public ownedNfts;
  
    constructor() payable ERC721('Pokemon Card', 'POKE') {
        maxSupply = 99999999;
    }


    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        maxSupply = _maxSupply;
    }
    function mint(string memory tokenURI) external payable {
       require(mintedWallets[msg.sender] < 1, 'You have reached maximum mint number');

        mintedWallets[msg.sender]++;
        totalSupply++;
        uint256 tokenId = totalSupply;
        ownedNfts[msg.sender].push(tokenId);
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId,tokenURI);
        emit Minted(msg.sender, tokenId);
    }
     
    function getAll(address _addr) public view returns (uint[] memory) {
    return ownedNfts[_addr];
    }

    uint public totalTrades = 0;
    struct Trade {
        address creator;
        uint creatorTokenId;
        bool isCompleted;
        uint tradeId;
        bool creatorConfirm;
        bool dealerConfirm;
        address dealer;
        uint dealerTokenId;
    }
  
    /***************** TRADE SEQUENCE *****************/

    //Trade Events

    event TradeCreated(address indexed _signer, uint indexed _id);
    event Cancel(address indexed _signer, uint indexed _id);
    event Bid(address indexed _signer, uint indexed _id);
    event FinalizeTrade(address indexed _from, address indexed _to, uint indexed _id);
    event CreatorConfirmed(address indexed _signer, uint indexed _id);
    event DealerConfirmed(address indexed _signer, uint indexed _id);
    mapping(uint => Trade) public trades;
    mapping(address => Trade[]) public userTrades;
    mapping(address => bool) public isTrading;
    Trade[] public allTrades;

    function getAlltrades() public view returns(uint){
        return allTrades.length;
    }

    function setTrade(uint _creatorTokenId) external payable {
        require(ownerOf(_creatorTokenId) == msg.sender, "You must own this NFT in order to trade it" ); 
        require(isTrading[msg.sender] == false, "You are already trading !");

        setApprovalForAll(address(this), true); 
        totalTrades++;
        isTrading[msg.sender] = true;
        trades[totalTrades] = Trade({
            creator:msg.sender,
            creatorTokenId: _creatorTokenId,
            isCompleted:false,
            tradeId:totalTrades,
            creatorConfirm:false,
            dealerConfirm:false,
            dealer:address(0),
            dealerTokenId:0
        });
        allTrades.push(trades[totalTrades]);
        userTrades[msg.sender].push(trades[totalTrades]);
        emit TradeCreated(msg.sender, totalTrades);

    }

    function bidTrade(uint _tradeId, uint _delaerTokenId) external payable {
        require(ownerOf(_delaerTokenId) == msg.sender, "You must own this NFT in order to trade it" ); 
        // require(ownedNfts[msg.sender].length + 1 > 0, "You dont have any nft" ); 
        require(isTrading[msg.sender] == false, "You are already trading ! ");
        
        setApprovalForAll(address(this), true); 
        isTrading[msg.sender] = true;
        trades[_tradeId].dealer = msg.sender;
        trades[_tradeId].dealerTokenId = _delaerTokenId;
        userTrades[msg.sender].push(trades[_tradeId]);
        emit Bid(msg.sender, _tradeId);
        
    }
    function approveTrade(uint _tradeId) external payable{
        require(msg.sender == trades[_tradeId].creator || msg.sender == trades[_tradeId].dealer, "You have no permission in this trade");
        if(msg.sender == trades[_tradeId].creator){
            require(trades[_tradeId].creatorConfirm == false,"You are already confirmed the trade");
            trades[_tradeId].creatorConfirm = true;
            emit CreatorConfirmed(msg.sender, _tradeId);
        } else if(msg.sender==trades[_tradeId].dealer){
            require(trades[_tradeId].dealerConfirm == false,"You are already confirmed the trade");
            trades[_tradeId].dealerConfirm = true;
            emit DealerConfirmed(msg.sender, _tradeId);

        }
    }
    
    function cancelTrade(uint _tradeId) external payable{
        require(msg.sender == trades[_tradeId].creator || msg.sender == trades[_tradeId].dealer, "You have no permission in this trade");
            isTrading[trades[_tradeId].dealer] = false;
            isTrading[trades[_tradeId].creator] = false;
        if(msg.sender == trades[_tradeId].creator){
            require(trades[_tradeId].isCompleted == false, "Trade ended already");
            delete trades[_tradeId];
            emit Cancel(msg.sender, _tradeId);
        } else if(msg.sender==trades[_tradeId].dealer){
            trades[_tradeId].dealerConfirm = false;
            trades[_tradeId].dealer = address(0);
            trades[_tradeId].dealerTokenId = 0;

            emit Cancel(msg.sender, _tradeId);
        }
    }


    function finalizeTrade(uint _tradeId) external payable {
        require(trades[_tradeId].creator == msg.sender || trades[_tradeId].dealer == msg.sender, "You have no permission in this trade");
        require(trades[_tradeId].isCompleted == false, "Trade already completed");
        require(trades[_tradeId].creatorConfirm == true && trades[_tradeId].dealerConfirm == true,"Trade is not approved");
        trades[_tradeId].isCompleted = true;
        IERC721(address(this)).safeTransferFrom(trades[_tradeId].creator, trades[_tradeId].dealer, trades[_tradeId].creatorTokenId);
        IERC721(address(this)).safeTransferFrom(trades[_tradeId].dealer, trades[_tradeId].creator, trades[_tradeId].dealerTokenId);
        ownedNfts[trades[_tradeId].dealer].push(trades[_tradeId].creatorTokenId);

        for(uint i = 0; i < ownedNfts[trades[_tradeId].dealer].length; i++){
            if(ownedNfts[trades[_tradeId].dealer][i] == trades[_tradeId].dealerTokenId){
                delete ownedNfts[trades[_tradeId].dealer][i];
            }
        }

        for(uint i = 0; i < ownedNfts[trades[_tradeId].creator].length; i++){
            if(ownedNfts[trades[_tradeId].creator][i] == trades[_tradeId].creatorTokenId){
                delete ownedNfts[trades[_tradeId].creator][i];
            }
        }
        
        ownedNfts[trades[_tradeId].creator].push(trades[_tradeId].dealerTokenId);
        emit FinalizeTrade(trades[_tradeId].creator, trades[_tradeId].dealer, _tradeId);
        isTrading[trades[_tradeId].creator] = false;
        isTrading[trades[_tradeId].dealer] = false;

    }
    
    

}