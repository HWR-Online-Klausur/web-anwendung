//This feature doesn't work yet! 15.08.21
const Router = require('express');
const router = new Router;

const timerRouter = require('./timerRouter');
const klausurRouter = require('./klausurRouter');
const dataRouter = require('./dataRouter');

router.use('/timer', timerRouter);
router.use('/klausur', klausurRouter);
router.use('/data', dataRouter);

module.exports = router;
