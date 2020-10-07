const router = require('express').Router();
const {serveUI} = require('./controllers')

router.get('/',serveUI)
// router.post('/update',updateData)


module.exports = router