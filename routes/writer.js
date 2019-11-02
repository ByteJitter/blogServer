var express = require('express');
var router = express.Router();
var writerController=require('../controllers/writer.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getBlog',writerController.getBlog);
router.get('/getBlogList',writerController.getBlogList);
router.get('/getGuestbook',writerController.getGuestbook);
router.post('/writeBlog',writerController.writeBlog);
router.post('/deleteBlog',writerController.deleteBlog);
router.post('/recommedBlog',writerController.recommedBlog);           /* 推荐置顶博客 */
router.get('/getSortList',writerController.getSortList);
router.get('/getSort',writerController.getSort);
router.get('/verify',writerController.verify);
router.post('/login',writerController.login);
router.get('/getAdminStatus',writerController.getAdminStatus);
router.post('/logout',writerController.logout);

module.exports = router;
