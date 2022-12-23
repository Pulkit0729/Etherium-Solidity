pragma solidity >=0.8.0;

contract Lottery{
    address public manager;
    address[] public players;
    constructor()public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restrict{
        uint index = random() % players.length;

        address contractAddress = address(this);

        payable(players[index]).transfer(contractAddress.balance);

        players = new address[](0);
    }

    function returnPlayers() public view returns(address[] memory){
        return players;
    }

    modifier restrict(){
        require(msg.sender == manager);
        _;
    }
}
