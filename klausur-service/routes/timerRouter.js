const Router = require('express');
const router = new Router;
const timerController = require('../controllers/timerController');
const klausurController = require('../controllers/klausurController');

router.get('', timerController.apiGetTime);
router.get('/start',klausurController.changeStatus, timerController.apiStartTimer);
router.get('/reset',timerController.apiResetTimer);
router.post('',timerController.apiSetTime);
router.post('/convert', timerController.apiSetTimeMinutes)
router.post('/add',timerController.apiAddTime);

module.exports = router;
