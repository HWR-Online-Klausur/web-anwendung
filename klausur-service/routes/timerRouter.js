const Router = require('express');
const router = new Router;
const timerController = require('../controllers/timerController');
const klausurController = require('../controllers/klausurController');
const userController = require("../controllers/userController");

router.get('', timerController.apiGetTime)
router.post('',userController.CheckDozentIDApi,timerController.apiSetTime);
router.post('/apiGetTime',userController.CheckDozentIDApi, timerController.apiGetTimeDozent);
router.post('/reset', userController.CheckDozentIDApi,timerController.apiResetTimer);
router.post('/start', userController.CheckDozentIDApi,klausurController.changeStatus, timerController.apiStartTimer);
router.post('/convert', userController.CheckDozentIDApi, timerController.apiSetTimeMinutes)
router.post('/add', userController.CheckDozentIDApi,timerController.apiAddTime);

module.exports = router;
