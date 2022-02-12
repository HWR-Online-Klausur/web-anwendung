const Router = require('express');
const router = new Router;
const userController = require('../controllers/userController');

router.post('/addStudent', userController.addStudent);
router.post('/deleteStudent', userController.deleteStudent);
router.get('/getAllUser', userController.findAllStudents);
router.get('/getUpdatePing', userController.getUpdatePing);

module.exports = router;
