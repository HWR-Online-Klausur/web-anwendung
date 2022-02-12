const Router = require('express');
const router = new Router;
const userController = require('../controllers/userController');

router.post('/getAllStudents', userController.findAllStudents);
router.post('/addStudent', userController.addStudent);
router.post('/deleteStudent', userController.deleteStudent);
router.post('/addStudentKlausurID', userController.addStudentKlausurID);

module.exports = router;
