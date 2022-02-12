const Router = require('express');
const router = new Router;
const klausurController = require('../controllers/klausurController');
const {checkFolder, uploadJSON} = require("../controllers/jsonReaderController");

router.post('/upload', checkFolder, uploadJSON);
router.get('/klausurStatus', klausurController.klausurStatusSend);
router.get('/getBody',klausurController.getBody);


module.exports = router;
