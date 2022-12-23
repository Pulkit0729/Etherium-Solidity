const HDwallet = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const {abi, evm} = require('./compile');

const provider = new HDwallet('diagram inform bounce novel normal silly army anchor horse cabbage math clock', 'https://ropsten.infura.io/v3/cbdc0e732f504d368543d34f739b8074');

const web3 = new Web3(provider);

const deploy = async()=> {
    const accounts = await web3.eth.getAccounts();
    
    const result = await new web3.eth.Contract(abi).deploy({data:evm.bytecode.object}).send({from: accounts[0], gas:'1000000'});
    console.log(result.options.address);
}
deploy();