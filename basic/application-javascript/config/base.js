const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../../test-application/javascript/AppUtil.js');

let ccp = {};
let caClient = {}
let wallet = {}
let gateway = {}
let network = {}
let contract = {}
let curUser = {}
module.exports = {
    ccp: ccp,
    caClient : caClient,
    wallet : wallet,
    gateway: gateway,
    network: network,
    contract: contract,
    curUser: curUser
}
