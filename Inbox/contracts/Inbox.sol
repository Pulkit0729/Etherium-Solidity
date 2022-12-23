pragma solidity >=0.8.0;

contract Inbox{
    string public message;

    function setMessage(string memory newMess) public {
        message = newMess;
    }

    constructor(string memory _message) public{
        message = _message;
    }
}