const Router = require('express');
const router = new Router;
const timerController = require('../controllers/timerController');

router.post('/start', timerController.apiStartTimer);
router.post('/reset', timerController.apiResetTimer);
router.post('/add',timerController.apiAddTime);

module.exports = router;
