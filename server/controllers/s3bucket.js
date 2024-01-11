const uuid = require('uuid/v1');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const { s3 } = require('./s3');

const storage = multerS3({
	s3: s3,
	bucket: `${process.env.BUCKET_NAME}`,
	contentType: multerS3.AUTO_CONTENT_TYPE,
	metadata: (req, file, cb) => {
		cb(null, { fieldname: file.fieldname });
	},
	key: (req, file, cb) => {
		const fileType = file.fieldname === 'video' ? 'video' : 'caption';
		const fileName =
			fileType + '/' + uuid() + (fileType === 'video' ? '.mp4' : '.vtt');
		cb(null, fileName);
	},
});

function sanitizeVideoFile(file, cb) {
	const fileExts = ['.mp4', '.mpg', '.3gp'];

	const isAllowedExt = fileExts.includes(
		path.extname(file.originalname.toLowerCase())
	);
	const isAllowedMimeType = file.mimetype.startsWith('video/');
	if (isAllowedExt && isAllowedMimeType) {
		return cb(null, true); // no errors
	} else {
		cb('Error: File type not allowed!');
	}
}

function sanitizeCaptionFile(file, cb) {
	const fileExts = ['.vtt', '.srt'];

	const isAllowedExt = fileExts.includes(
		path.extname(file.originalname.toLowerCase())
	);
	const isAllowedMimeType = file.mimetype.startsWith('text/vtt');
	if (isAllowedExt && isAllowedMimeType) {
		return cb(null, true); // no errors
	} else {
		cb('Error: File type not allowed!');
	}
}

exports.upload = multer({
	storage,
	fileFilter: (req, file, callback) => {
		if (file.fieldname === 'video') {
			sanitizeVideoFile(file, callback);
		} else if (file.fieldname === 'caption') {
			sanitizeCaptionFile(file, callback);
		} else {
			callback(new Error('Unexpected field'));
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 20,
	},
});
