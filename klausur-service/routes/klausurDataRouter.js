const Router = require('express');
const klausurAbgabeController = require('../controllers/klausurAbgabeController');
const router = new Router;

const multer  = require('multer')
const upload = multer()

router.post('/saveKlausurData',upload.none(),klausurAbgabeController.saveKlausurData);


module.exports = router;
