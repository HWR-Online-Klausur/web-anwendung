const Router = require('express');
const router = new Router;
const userController = require('../controllers/userController');

router.get('/getAllUser', userController.findAllStudents);
router.get('/getUpdatePing', userController.getUpdatePing);
router.post('/addStudent', userController.addStudent);
router.post('/deleteStudent', userController.deleteStudent);
router.post('/addStudentKlausurID', userController.addStudentKlausurID);

module.exports = router;
