const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
      'lottery.sol': {
        content: source
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };
const data = JSON.parse(solc.compile(JSON.stringify(input))).contracts['lottery.sol'].Lottery;
//  fs.writeFileSync('data.json', JSON.stringify(data));
module.exports = data