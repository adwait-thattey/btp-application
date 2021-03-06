const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../../test-application/javascript/AppUtil.js');
const config = require('../config/base')

const channelName = 'channel1';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser01';

exports.enrollAdmin = async (req, res) => {
    await enrollAdmin(config.caClient, config.wallet, mspOrg1);
    res.status(200).send({"status":"Admin enrolled successfully"})
}

exports.registerUser = async (req, res) => {
    const userName = req.body.userName
    await registerAndEnrollUser(config.caClient, config.wallet, mspOrg1, userName, 'org1.department1');
    config.curUser = userName
    res.status(200).send({"status":"User enrolled successfully", "userName": userName})
}

exports.connectGateway = async (req, res) => {
    const userName = req.body.userName;
    config.gateway = new Gateway();
    const wallet = config.wallet
    await config.gateway.connect(config.ccp, {
        wallet,
        identity: userName,
        discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    });
    config.network = await config.gateway.getNetwork(channelName);
    config.contract = config.network.getContract(chaincodeName);
    res.status(200).send({"status":"Gateway Connected", "userName": userName})

}

