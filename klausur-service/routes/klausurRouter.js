const Router = require('express');
const router = new Router;
const klausurController = require('../controllers/klausurController');
const jsonReaderController = require('../controllers/jsonReaderController');

router.post('/jsonRead',jsonReaderController.checkFolder, jsonReaderController.uploadJSON);
router.get('/klausurStatus', klausurController.klausurStatusSend);
router.get('/getBody',klausurController.getBody);


module.exports = router;
