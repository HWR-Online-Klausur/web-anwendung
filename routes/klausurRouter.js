const Router = require('express');
const router = new Router;
const klausurController = require('../controllers/klausurController');

router.post('/jsonRead',klausurController.uploadJSON);
router.post('/klausurStatus', klausurController.klausurStatusSend);
router.post('/setTime', klausurController.setTime);
router.post('/getBody',klausurController.getBody);


module.exports = router;
