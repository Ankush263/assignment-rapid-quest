const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
	createdAt: {
		type: Date,
		default: Date.now,
	},
	video: {
		type: String,
		required: [true, 'Must provide a video url'],
	},
	caption: {
		type: String,
	},
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
