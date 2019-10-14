var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Profile = require("../models/Profile");
//var User = require("../models/User");
const { check, validationResult } = require('express-validator');

// @route : GET api/profile/me
// @desc : Get current user's profile
// @access : Public

router.get('/me', function (req, res, next) {
	try {
		Profile.findOne({ user: req.user.id }, function (err, profile) {
			if (!profile) {
				return res.status(400).json({ msg: 'There is no profile for this user' });
			}
			res.json(profile);
			//console.log(profile.company + " saved to profile collection.");
			//const profile = Profile.findOne({ user: req.user.id });
		});
	} catch (err) {
		console.error(err.message);

	}
})

// @route : POST api/profile/
// @desc : create/update a user's profile
// @access : Private
router.post('/', [check('status', 'Status is required').not().isEmpty(), check('skills', 'Skills is required').not().isEmpty()], function (req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() })
	}
	const {
		name,
		company,
		website,
		location,
		bio,
		status,
		githubusername,
		skills,
		youtube,
		linkedin
	} = req.body;
	//Build profile object
	const profileFields = {};
	profileFields.user = req.user.id;
	if (name)
		profileFields.name = name;
	if (company)
		profileFields.company = company;
	if (website)
		profileFields.website = website;
	if (location)
		profileFields.location = location;
	if (bio)
		profileFields.bio = bio;
	if (status)
		profileFields.status = status;
	if (githubusername)
		profileFields.githubusername = githubusername;
	if (skills) {
		profileFields.skills = skills.split(',').map(skill => skill.trim());
	}
	console.log(profileFields.skills);
	profileFields.social = {}
	if (youtube) profileFields.social.youtube = youtube;
	if (linkedin) profileFields.social.linkedin = linkedin;

	try {
		let profile = Profile.findOne({ user: req.user.id });
		if (profile) {
			Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }, function (err, profile) {
				return res.json(profile);
			});

		}

		profile = new Profile(profileFields);
		profile.save(function (err) {
			if (err)
				res.status(500).send('Server Error');
			res.json(profile);
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
	//	res.send("hello");
});

// @route  : GET api/profile/
// @desc   : Get all user's profiles
// @access : Public

router.get('/', function (req, res, next) {
	try {
		Profile.find(function (err, profiles) {
			res.json(profiles);
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  : GET api/profile/:user_id
// @desc   : Get all users profiles
// @access : Public

router.get('/:user_id', function (req, res, next) {
	try {
		Profile.findOne({ user: req.params.user_id }, function (err, profile1) {
			if (!profile1)
				return res.status(400).json({ msg: 'There is no profile for this user' });
			res.json(profile1);
		});
	} catch (err) {
		console.error(err.message);
		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Server Error');
	}
});

// @route  : DELETE api/profile/
// @desc   : Delete a user's profile and the user himself
// @access : Private

// router.delete('/', function (req, res, next) {
// 	try {
// 		// Remove profile
// 		Profile.findOneAndRemove({ user: req.user.id }, function (err) {
// 			//res.json({ msg: 'Profile deleted' });
// 		});
// 		User.findOneAndRemove({ _id: req.user.id }, function (err) {
// 			res.json({ msg: 'User deleted' })
// 		});
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(500).send('Server Error');
// 	}
// });

// @route  : PUT api/profile/experience
// @desc   : Add experience to profile
// @access : Private

router.put('/experience', [check('title', 'Title is required').not().isEmpty(), check('company', 'Company is required').not().isEmpty(), check('from', 'From date is required').not().isEmpty(),], function (req, res, err) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const {
		title,
		company,
		location,
		from,
		to,
		current,
		description
	} = req.body;

	const newExperience = {
		title,
		company,
		location,
		from,
		to,
		current,
		description
	}
	try {
		Profile.findOne({ user: req.user.id }, function (err, profile) {
			profile.experience.unshift(newExperience);
			profile.save(function (err) {
				res.json(profile);
			});
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  : DELETE api/profile/experience/:experience_id
// @desc   : Add experience to profile
// @access : Private

router.delete('/experience/:experience_id', function (req, res, err) {
	try {
		console.log('in here');
		Profile.findOne({ user: req.user.id }, function (err, profile) {
			console.log('in here');
			//get the index of the experience you want to remove
			const index = profile.experience.map(element => element.id).indexOf(req.params.experience_id);

			//remove the experience at the specified index
			profile.experience.splice(index, 1);

			profile.save(function (err) {
				res.json(profile);
			});
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  : PUT api/profile/education
// @desc   : Add education to profile
// @access : Private

router.put('/education', [check('school', 'School is required').not().isEmpty(), check('degree', 'Degree is required').not().isEmpty(), check('from', 'From date is required').not().isEmpty(), check('fieldofstudy', 'Feild of study is required').not().isEmpty()], function (req, res, err) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
	} = req.body;

	const newEducation = {
		school,
		degree,
		fieldofstudy,
		from,
		to,
		current,
		description
	}
	try {
		Profile.findOne({ user: req.user.id }, function (err, profile) {
			profile.education.unshift(newEducation);
			profile.save(function (err) {
				res.json(profile);
			});
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route  : DELETE api/profile/education/:education_id
// @desc   : Add education to profile
// @access : Private

router.delete('/education/:education_id', function (req, res, err) {
	try {
		console.log('in here');
		Profile.findOne({ user: req.user.id }, function (err, profile) {
			console.log('in here');
			//get the index of the education you want to remove
			const index = profile.education.map(element => element.id).indexOf(req.params.education_id);

			//remove the education at the specified index
			profile.education.splice(index, 1);

			profile.save(function (err) {
				res.json(profile);
			});
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
