const Router = require('express');
const klausurAbgabeController = require('../controllers/klausurAbgabeController');
const router = new Router;

//const multer  = require('multer')
const userController = require("../controllers/userController");
//const upload = multer()

//router.post('/saveKlausurData',upload.none(), userController.CheckDozentIDApi,klausurAbgabeController.saveKlausurData);
router.post('/saveKlausurData', userController.CheckKlausurIDAPI,klausurAbgabeController.saveKlausurData);
router.post('/downloadKlausurData', userController.CheckDozentIDApi,klausurAbgabeController.downloadKlausur);
router.post('/getKlausurData', userController.CheckDozentIDApi,klausurAbgabeController.getKlausurData);
router.post('/checkIfStudentsPassedKlausur', userController.CheckDozentIDApi,klausurAbgabeController.checkIfStudentsPassedKlausur);


module.exports = router;
