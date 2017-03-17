'use strict';

var express = require('express');
var controller = require('./property.controller');

//
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './dist/client/assets/images/photos/');
	},
	filename: function (req, file, cb) {
		crypto.pseudoRandomBytes(16, function(err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
		})
	}
})

var upload = multer({storage: storage});
//

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

// custom design
router.get('/cat/:cat', controller.findByCat);
router.post('/upload/:id', upload.any(), controller.uploadImage);
router.put('/remove/:id/:mid', controller.deleteImage);
router.put('/update/:id/:mid', controller.editImage);

module.exports = router;
