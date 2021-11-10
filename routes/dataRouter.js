const Router = require('express');
const router = new Router;
const userController = require('../controllers/userController');

router.post('/addUser', userController.addUser);
router.post('/deleteUser', userController.deleteUser);
router.post('/getAllUser', userController.findAllUser);
router.post('/getUpdatePing', userController.getUpdatePing);

module.exports = router;
