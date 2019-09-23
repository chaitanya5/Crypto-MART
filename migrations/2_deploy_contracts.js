var Cryptomart = artifacts.require("./Cryptomart.sol");

module.exports = function(deployer) {
  deployer.deploy(Cryptomart);
};
