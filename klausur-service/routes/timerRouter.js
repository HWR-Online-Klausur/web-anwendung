const Router = require('express');
const router = new Router;
const timerController = require('../controllers/timerController');
const klausurController = require('../controllers/klausurController');

router.get('', timerController.apiGetTime)
router.post('',timerController.apiSetTime);
router.post('/apiGetTime', timerController.apiGetTimeDozent);
router.post('/reset',timerController.apiResetTimer);
router.post('/start',klausurController.changeStatus, timerController.apiStartTimer);
router.post('/convert', timerController.apiSetTimeMinutes)
router.post('/add',timerController.apiAddTime);

module.exports = router;
