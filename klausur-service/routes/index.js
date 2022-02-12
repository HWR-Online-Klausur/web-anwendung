const Router = require('express');
const router = new Router;

const timerRouter = require('./timerRouter');
const klausurRouter = require('./klausurRouter');
const klausurDataRouter = require('./klausurDataRouter');
const dataRouter = require('./userRouter');

router.use('/timer', timerRouter);
router.use('/klausur', klausurRouter);
router.use('/klausurData', klausurDataRouter);
router.use('/data', dataRouter);

module.exports = router;
