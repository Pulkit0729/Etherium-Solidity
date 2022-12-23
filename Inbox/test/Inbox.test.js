const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const { abi, evm } = require('../compile');

const web3 = new Web3(ganache.provider());

const msg = 'hi there'
let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(abi).deploy({data:evm.bytecode.object, arguments:[msg]}).send({from: accounts[0], gas:'1000000'});
})

describe('getAccount', function () {
    it('succesfuly deploy', () => {
        assert.ok(inbox.options.address);
    });
    it('it has a default msg', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, msg);
    })
    it('changed msg', async()=>{
        await inbox.methods.setMessage('bye').send({from: accounts[0], gas:'1000000'});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    })
})