const Router = require('express');
const router = new Router;
const klausurController = require('../controllers/klausurController');

router.post('/klausurStatus', klausurController.apiStartTimer);
router.post('/setTime', klausurController.apiResetTimer);
router.post('/getBody',klausurController.apiAddTime);

module.exports = router;
