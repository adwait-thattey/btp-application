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

function prettyJSONString(inputString) {
	return JSON.stringify(JSON.parse(inputString), null, 2);
}

exports.registerDevice = async (req, res) => {
    const deviceID = req.body.deviceID
    const deviceName = req.body.deviceName
    console.log('\n--> Submit Transaction: RegisterDevice, Initialize Device Details');
    await config.contract.submitTransaction('RegisterDevice', deviceID, deviceName, '127.0.0.1', config.curUser);
    console.log('*** Result: committed');

    result = await config.contract.evaluateTransaction('GetDeviceData', deviceID);
    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            
    res.status(200).send({"status":"Device Registered", "data": JSON.parse(prettyJSONString(result.toString()))})
}

exports.updateDeviceData = async (req, res) => {
    const data = req.body.data
    const deviceID = req.body.deviceID

    console.log('\n--> Submit Transaction: Update Data');
    await config.contract.submitTransaction('UpdateData', data, config.curUser);
    console.log('*** Result: committed');
    
    result = await config.contract.evaluateTransaction('GetDeviceData', deviceID);
    console.log(`*** Result: ${prettyJSONString(result.toString())}`);

    res.status(200).send({"status":"Data Updated", "data": JSON.parse(prettyJSONString(result.toString()))})
}

exports.deleteDeviceData = async (req, res) => {
    const deviceID = req.body.deviceID
    console.log('\n--> Submit Transaction: DeleteDevice');
    await config.contract.submitTransaction('DeleteDevice', deviceID);
    console.log('*** Result: committed');
    res.status(200).send({"status":"Device Deleted"})
}

exports.getDeviceData = async (req, res) => {
    
    const deviceID = req.body.deviceID
    console.log('\n--> Submit Transaction: Get Data');
    result = await config.contract.evaluateTransaction('GetDeviceData', deviceID);
    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
            
    res.status(200).send({"status":"Device Registered", "data": JSON.parse(prettyJSONString(result.toString()))})
}

exports.getAllDevices = async (req, res) => {
    console.log('\n--> Submit Transaction: GetAllDevices');
    result = await config.contract.evaluateTransaction('GetAllDevices');
    console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    res.status(200).send({"status":"All Devices", "data": JSON.parse(prettyJSONString(result.toString()))})
}


