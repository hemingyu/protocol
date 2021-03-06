var ErrorLib                = artifacts.require("./lib/ErrorLib");
var UintLib                 = artifacts.require("./lib/UintLib");
var TestLrcToken            = artifacts.require("./test/TestLrcToken");
var TokenRegistry           = artifacts.require("./TokenRegistry");
var RinghashRegistry        = artifacts.require("./RinghashRegistry");
var TokenTransferDelegate   = artifacts.require("./TokenTransferDelegate");
var LoopringProtocolImpl    = artifacts.require("./LoopringProtocolImpl");

module.exports = function(deployer, network, accounts) {

  if (network == 'live') {

  } else {
    deployer.then(() => {
      return Promise.all([
        ErrorLib.deployed(),
        UintLib.deployed(),
        TokenRegistry.deployed(),
        RinghashRegistry.deployed(),
        TokenTransferDelegate.deployed(),
      ]);
    }).then((contracts) => {
      var [errLib, uintLib, tokenRegistry] = contracts;
      return tokenRegistry.getAddressBySymbol("LRC");
    }).then(lrcAddr => {
      deployer.link(ErrorLib, LoopringProtocolImpl);
      deployer.link(UintLib, LoopringProtocolImpl);
      return deployer.deploy(
        LoopringProtocolImpl,
        lrcAddr,
        TokenRegistry.address,
        RinghashRegistry.address,
        TokenTransferDelegate.address,
        5,
        2);
    });

  }
};
