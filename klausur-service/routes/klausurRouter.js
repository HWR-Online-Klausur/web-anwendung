const Router = require('express');
const router = new Router;
const klausurController = require('../controllers/klausurController');
const {checkFolder, uploadJSON, uploadJSONForm} = require("../controllers/jsonReaderController");
const userController = require("../controllers/userController");

router.get('/klausurStatus', klausurController.klausurStatusSend);
router.get('/getBody',klausurController.getBody);
router.post('/upload', userController.CheckDozentIDApi, uploadJSON);
router.post('/upload/form', userController.CheckDozentIDApi, checkFolder, uploadJSONForm);
router.post('/getAllKlausuren', userController.CheckDozentIDApi, klausurController.getAllKlausuren);



module.exports = router;
