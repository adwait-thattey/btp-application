const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const express = require('express')
const dotenv = require('dotenv')
const config = require('./config/base')

const app = express()
const uiroutes = require('./ui/routes')
const userRoutes = require('./users/routes');
const deviceRoutes = require('./devices/routes');

const channelName = 'mychannel';
const chaincodeName = 'basic';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser01';

config.ccp = buildCCPOrg1();
config.caClient = buildCAClient(FabricCAServices, config.ccp, 'ca.org1.example.com');
buildWallet(Wallets, walletPath).then( wallet => {
    config.wallet = wallet
    console.log("Wallet Ready")
});


app.use(express.json())




const port = 3000;

app.use('/users', userRoutes);
app.use('/devices', deviceRoutes);
app.use('/ui', uiroutes)

app.listen(port, () => console.log(`Server running on ${port}`));
