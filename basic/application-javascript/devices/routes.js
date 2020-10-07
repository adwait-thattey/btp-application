const router = require('express').Router();
const {registerDevice, updateDeviceData, getDeviceData, getAllDevices, deleteDeviceData} = require('./controllers')

router.post('/register',registerDevice)
router.post('/update',updateDeviceData)
router.post('/delete', deleteDeviceData)
router.post('/all', getAllDevices)
router.get('/', getDeviceData)



module.exports = router