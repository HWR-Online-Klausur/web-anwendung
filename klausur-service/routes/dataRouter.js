const Router = require('express');
const router = new Router;
const userController = require('../controllers/userController');

router.post('/addUser', userController.addUser);
router.post('/deleteUser', userController.deleteUser);
router.get('/getAllUser', userController.findAllUser);
router.get('/getUpdatePing', userController.getUpdatePing);

module.exports = router;
