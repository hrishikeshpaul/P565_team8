const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema(
	{
		title: {
			type: String
		},
		postion: {
			type: String,
			required: String
		},
		description: {
			type: String
		},
		skills: {
			type: [String],
			required: true
		},
		location: {
			type: String
		},
		pictureUrl: {
			type: String
		},
		applicants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user'
			}
		],
		deadline: {
			type: Date
		}
	});
module.exports = mongoose.model('Job', JobSchema);