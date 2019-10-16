var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Job = require("../models/Job");
//var User = require("../models/User");
const { check, validationResult } = require('express-validator');

router.get('/me', function (req, res, next) {
	res.send("Hello world");
});
// @route : POST api/job/
// @desc : create/update a job's profile
// @access : Private
router.post('/', [check('title', 'Title is required').not().isEmpty(), check('skills', 'Skills is required').not().isEmpty()], function (req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	const {
		title,
		position,
		description,
		skills,
		location,
		pictureUrl,
		deadline
	} = req.body;
	//Build profile object
	const jobFields = {};
	// jobFields.user = req.user.id;
	if (title)
		jobFields.title = title;
	if (position)
		jobFields.position = position;
	if (description)
		jobFields.description = description;
	if (location)
		jobFields.location = location;
	if (pictureUrl)
		jobFields.pictureUrl = pictureUrl;
	if (deadline)
		jobFields.deadline = deadline;
	if (skills) {
		jobFields.skills = skills.split(',').map(skill => skill.trim());
	}
	console.log(jobFields.skills);

	try {
		let job;

		job = new Job(jobFields);
		job.save(function (err) {
			if (err)
				res.status(500).send('Server Error');
			res.json(job);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
	//	res.send("hello");
});

// // @route  : GET api/job/
// // @desc   : Get all jobs
// // @access : Public

router.get('/', function (req, res, next) {
	try {
		Job.find(function (err, jobs) {
			res.json(jobs);
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  : GET api/job/:job_id
// @desc   : Get a specific job listing
// @access : Public

router.get('/:job_id', function (req, res, next) {
	try {
		Job.findOne({ _id: req.params.job_id }, function (err, jobs) {
			if (!jobs)
				return res.status(400).json({ msg: 'There is no job found' });
			res.json(jobs);
		});
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Job not found' });
		}
		res.status(500).send('Server Error');
	}
});

//@route  : DELETE api/job/:job_id
//@desc   : Delete a job listing
//@access : Private

router.delete('/:job_id', function (req, res, next) {
	try {
		// Remove job

		Job.findOneAndRemove({ _id: req.job_id }, function (err) {
			res.json({ msg: 'User deleted' })
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route  : PATCH api/job/:job_id
//@desc   : Apply to a job listing
//@access : Private

router.patch('/:job_id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
	try {
		// Remove job

		Job.findOneAndUpdate({ _id: req.job_id }, function (err, job) {
			job.applicants.push(req.user.id);
			res.json(job);
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;