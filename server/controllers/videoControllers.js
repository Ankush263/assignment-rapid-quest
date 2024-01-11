const Video = require('../models/videoModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { s3 } = require('./s3');

exports.createVideo = catchAsync(async (req, res, next) => {
	if (!req.files['video']) {
		return next(new AppError('There is no video key available', 404));
	}
	const videoKey = req.files['video'][0].key;
	const { caption } = req.body;

	const video = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${videoKey}`;

	const doc = await Video.create({ video, caption });

	res.status(201).json({
		status: 'success',
		data: {
			video: doc,
		},
	});
});

exports.getAllVideos = catchAsync(async (req, res, next) => {
	const video = await Video.find();

	res.status(200).json({
		status: 'success',
		data: {
			video,
		},
	});
});

exports.deleteVideoFile = catchAsync(async (req, res, next) => {
	const video = await Video.findById(req.params.id);

	const parts = video.video.split(
		`https://${process.env.BUCKET_NAME}.s3.amazonaws.com/`
	);
	const key = parts[1];

	const params = {
		Bucket: `${process.env.BUCKET_NAME}`,
		Key: key,
	};
	s3.deleteObject(params, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
	next();
});

exports.deleteVideo = catchAsync(async (req, res, next) => {
	const video = await Video.findByIdAndDelete(req.params.id);
	if (!video) {
		return next(new AppError('No video found with that id', 404));
	}

	res.status(204).json({
		status: 'success',
		data: null,
	});
});
