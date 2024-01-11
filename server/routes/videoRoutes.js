const express = require('express');

const {
	createVideo,
	getAllVideos,
	deleteVideo,
	deleteVideoFile,
} = require('../controllers/videoControllers');
const { upload } = require('../controllers/s3bucket');

const router = express.Router();

router
	.route('/')
	.post(upload.fields([{ name: 'video', maxCount: 1 }]), createVideo)
	.get(getAllVideos);

router.route('/:id').delete(deleteVideoFile, deleteVideo);

module.exports = router;
