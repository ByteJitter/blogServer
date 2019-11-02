var express = require('express');
var router = express.Router();
var guestController=require('../controllers/guest');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/leaveMsg',guestController.leaveMsg);
router.post('/leaveMsg_h',guestController.leaveMsg_h);
router.get('/getGuestbook_h',guestController.getGuestbook_h);
router.post('/deleteMsg_h',guestController.deleteMsg_h);

module.exports = router;
