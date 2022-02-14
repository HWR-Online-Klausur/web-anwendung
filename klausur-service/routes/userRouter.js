const Router = require('express');
const router = new Router;
const userController = require('../controllers/userController');

router.get('/getAllDozents', userController.CheckDozentIDApi, userController.getAllDozents);
router.post('/getAllStudents', userController.CheckDozentIDApi, userController.findAllStudents);
router.post('/addStudent', userController.addStudent);
router.post('/deleteStudent', userController.deleteStudent);
router.post('/addStudentKlausurID', userController.addStudentKlausurID);
router.post('/loginDozent', userController.loginDozent);
router.post('/addDozent', userController.CheckDozentIDApi, userController.addDozent);
router.post('/deleteDozent', userController.CheckDozentIDApi, userController.deleteDozent);

module.exports = router;
