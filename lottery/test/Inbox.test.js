const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const { abi, evm } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    lottery = await new web3.eth.Contract(abi).deploy({data:evm.bytecode.object}).send({from: accounts[0], gas:'1000000'});
})

describe('deploy lottery', function () {
    it('succesfuly deploy', () => {
        assert.ok(lottery.options.address);
    });
    it('enters one accounts', async () => {
        await lottery.methods.enter().send({from: accounts[0], value:web3.utils.toWei('0.02', 'ether')});
        const players = await lottery.methods.returnPlayers().call({from: accounts[0]});

        assert.equal(players[0], accounts[0]);
        assert.equal(1, players.length);
    })
    it('enters multiple accounts', async () => {
        await lottery.methods.enter().send({from: accounts[0], value:web3.utils.toWei('0.02', 'ether')});
        await lottery.methods.enter().send({from: accounts[1], value:web3.utils.toWei('0.02', 'ether')});
        const players = await lottery.methods.returnPlayers().call({from: accounts[0]});

        assert.equal(players[0], accounts[0]);
        assert.equal(players[1], accounts[1]);
        assert.equal(2, players.length);
    })
    it('requires a certain amount of etherium', async()=>{
        try {
        await lottery.methods.enter().send({from: accounts[0], value:100});
            assert(false);
        } catch (error) {
            assert(error)
        }
    })
    it('only manager can call', async()=>{
        try {
        await lottery.methods.pickWinner().send({from: accounts[1], value:100});
            assert(false);
        } catch (error) {
            assert(error)
        }
    })
    it('money is tranffered', async()=>{
        await lottery.methods.enter().send({from: accounts[0], value:web3.utils.toWei('2', 'ether')});
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({from: accounts[0]});
        const finallBalance = await web3.eth.getBalance(accounts[0]);

        assert(finallBalance-initialBalance > web3.utils.toWei('1.8', 'ether'));
    })

})