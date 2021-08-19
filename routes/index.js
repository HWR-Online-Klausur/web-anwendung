//This feature doesn't work yet! 15.08.21
const Router = require('express');
const router = new Router;

const timerRouter = require('./timerRouter');
const klausurRouter = require('./klausurRouter');

router.use('/timer', timerRouter);
router.use('/klausur', klausurRouter);

module.exports = router;
