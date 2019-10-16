var mongoose = require('mongoose')
var passport = require('passport')
var settings = require('../config/settings')
require('../config/passport')(passport)
var express = require('express')
var jwt = require('jsonwebtoken')
var router = express.Router()
var Profile = require('../models/Profile')
// var User = require("../models/User");
const { check, validationResult } = require('express-validator')

router.post('/', passport.authenticate('jwt', {session: false}), function (req, res, next) {

  // removing keys that don't have a value to prevent false updates
  req.body.data = Object.entries(req.body.data).reduce((a,[k,v]) => (v ? {...a, [k]:v} : a), {})
  // if object is empty then return an error
  if (Object.entries(req.body.data).length === 0 && req.body.data.constructor === Object) {
    return res.status(400).send('All Fields Can\'t Be Empty')
  }
  req.body.data['user'] = req.body.user.id

  Profile.findOne({user: req.body.user.id}, function (err, profile) {
    if (profile) {
      Profile.updateOne({user: req.body.user.id}, req.body.data, function (err, profile) {
        if (err)
          return res.status(400).send('Server Error')
        res.status(204).send(profile)
      })
    } else {
      new Profile(req.body.data).save(function (err, profile) {
        if (err)
          return res.status(400).send('Server Error')
        res.status(201).send(profile)
      })
    }
  })

})

//
// // @route : GET api/profile/me
// // @desc : Get current user's profile
// // @access : Public
// router.get('/check', function (req, res, next) {
//   res.send('hello')
// })
// router.get('/me', passport.authenticate('jwt', { session: false }), function (req, res, next) {
//   try {
//     Profile.findOne({ user: req.user.id }, function (err, profile) {
//       if (!profile) {
//         return res.status(400).json({ msg: 'There is no profile for this user' })
//       }
//       res.json(profile)
//       // console.log(profile.company + " saved to profile collection.");
//       // const profile = Profile.findOne({ user: req.user.id });
//     })
//   } catch (err) {
//     console.error(err.message)
//   }
// })
//
// @route : POST api/profile/
// @desc : create/update a user's profile
// @access : Private
// router.post('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
//   const {
//     name,
//     company,
//     website,
//     location,
//     bio,
//     status,
//     githubusername,
//     skills,
//     youtube,
//     linkedin
//   } = req.body
//   // Build profile object
//   const profileFields = {}
//   profileFields.user = req.body.user.id
//   if (name) { profileFields.name = name }
//   if (company) { profileFields.company = company }
//   if (website) { profileFields.website = website }
//   if (location) { profileFields.location = location }
//   if (bio) { profileFields.bio = bio }
//   if (status) { profileFields.status = status }
//   if (githubusername) { profileFields.githubusername = githubusername }
//   if (skills) {
//     profileFields.skills = skills.split(',').map(skill => skill.trim())
//   }
//   profileFields.social = {}
//   if (youtube) profileFields.social.youtube = youtube
//   if (linkedin) profileFields.social.linkedin = linkedin
//
//   try {
//     let profile = Profile.findOne({ user: req.body.user.id })
//     if (profile) {
//       Profile.findOneAndUpdate({ user: req.body.user.id }, { $set: profileFields }, { new: true }, function (err, profile) {
//         if (err)
//           console.log(err)
//         return res.send(profile)
//       })
//     }
//
//     profile = new Profile(profileFields)
//     profile.save(function (err, profile) {
//       console.log('here it is')
//       if (err) {
//         console.log(err)
//       }
//
//       res.status(201).send(profile)
//     })
//   } catch (error) {
//     console.error(error.message)
//     res.status(500).send('Server Error')
//   }
//   //	res.send("hello");
// })

// // @route  : GET api/profile/
// // @desc   : Get all user's profiles
// // @access : Public
//
// router.get('/', passport.authenticate('jwt', { session: false }), function (req, res, next) {
//   try {
//     Profile.find(function (err, profiles) {
//       res.json(profiles)
//     })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// })
//
// // @route  : GET api/profile/:user_id
// // @desc   : Get all users profiles
// // @access : Public
//
// router.get('/:user_id', passport.authenticate('jwt', { session: false }), function (req, res, next) {
//   try {
//     Profile.findOne({ user: req.params.user_id }, function (err, profile1) {
//       if (!profile1) { return res.status(400).json({ msg: 'There is no profile for this user' }) }
//       res.json(profile1)
//     })
//   } catch (err) {
//     console.error(err.message)
//     if (err.kind == 'ObjectId') {
//       return res.status(400).json({ msg: 'Profile not found' })
//     }
//     res.status(500).send('Server Error')
//   }
// })
//
// // @route  : DELETE api/profile/
// // @desc   : Delete a user's profile and the user himself
// // @access : Private
//
// // router.delete('/', function (req, res, next) {
// // 	try {
// // 		// Remove profile
// // 		Profile.findOneAndRemove({ user: req.user.id }, function (err) {
// // 			//res.json({ msg: 'Profile deleted' });
// // 		});
// // 		User.findOneAndRemove({ _id: req.user.id }, function (err) {
// // 			res.json({ msg: 'User deleted' })
// // 		});
// // 	} catch (err) {
// // 		console.error(err.message);
// // 		res.status(500).send('Server Error');
// // 	}
// // });
//
// // @route  : PUT api/profile/experience
// // @desc   : Add experience to profile
// // @access : Private
//
// router.put('/experience', passport.authenticate('jwt', { session: false }), function (req, res, err) {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
//   //	res.send(req.body);
//   try {
//     Profile.findOne({ user: req.user.id }, function (err, profile) {
//       for (i = 0; i < req.body.experience.length; i++) {
//         profile.experience.push(req.body.experience[i])
//       }
//       profile.save(function (err) {
//         res.json(profile)
//       })
//     })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// })
// // @route  : PUT api/profile/education/:education_id
// // @desc   : Update the details of an existing education
// // @access : Private
//
// router.put('/experience/:experience_id', passport.authenticate('jwt', { session: false }), function (req, res, err) {
//   try {
//     console.log('in here')
//     const {
//       title,
//       company,
//       location,
//       from,
//       to,
//       current,
//       description
//     } = req.body
//
//     const newExperience = {
//       title,
//       company,
//       location,
//       from,
//       to,
//       current,
//       description
//     }
//     Profile.findOne({ user: req.user.id },
//       //  'education._id': req.params.education_id }, { $set: newEducation },
//       function (err, profile) {
//         const index = profile.experience.map(element => element.id).indexOf(req.params.experience_id)
//         profile.experience[index] = newExperience
//         profile.save(function (err) {
//           res.json(profile)
//         })
//         // res.json(profile);
//       })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// })
//
// // @route  : DELETE api/profile/experience/:experience_id
// // @desc   : Add experience to profile
// // @access : Private
//
// router.delete('/experience/:experience_id', passport.authenticate('jwt', { session: false }), function (req, res, err) {
//   try {
//     console.log('in here')
//     Profile.findOne({ user: req.user.id }, function (err, profile) {
//       console.log('in here')
//       // get the index of the experience you want to remove
//       const index = profile.experience.map(element => element.id).indexOf(req.params.experience_id)
//
//       // remove the experience at the specified index
//       profile.experience.splice(index, 1)
//
//       profile.save(function (err) {
//         res.json(profile)
//       })
//     })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// })
//
// // @route  : PUT api/profile/education
// // @desc   : Add education to profile
// // @access : Private
//
// router.put('/education', passport.authenticate('jwt', { session: false }), function (req, res, err) {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
//   //	res.send(req.body);
//   try {
//     Profile.findOne({ user: req.user.id }, function (err, profile) {
//       for (i = 0; i < req.body.education.length; i++) {
//         profile.education.push(req.body.education[i])
//       }
//       profile.save(function (err) {
//         res.json(profile)
//       })
//     })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// })
//
// // @route  : PUT api/profile/education/:education_id
// // @desc   : Update the details of an existing education
// // @access : Private
//
// router.put('/education/:education_id', passport.authenticate('jwt', { session: false }), function (req, res, err) {
//   try {
//     console.log('in here')
//     const {
//       school,
//       degree,
//       fieldofstudy,
//       from,
//       to,
//       current,
//       description
//     } = req.body
//
//     const newEducation = {
//       school,
//       degree,
//       fieldofstudy,
//       from,
//       to,
//       current,
//       description
//     }
//     Profile.findOne({ user: req.user.id },
//       //  'education._id': req.params.education_id }, { $set: newEducation },
//       function (err, profile) {
//         const index = profile.education.map(element => element.id).indexOf(req.params.education_id)
//         profile.education[index] = newEducation
//         profile.save(function (err) {
//           res.json(profile)
//         })
//         // res.json(profile);
//       })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// })
//
// // @route  : DELETE api/profile/education/:education_id
// // @desc   : Add education to profile
// // @access : Private
//
// router.delete('/education/:education_id', passport.authenticate('jwt', { session: false }), function (req, res, err) {
//   try {
//     console.log('in here')
//     Profile.findOne({ user: req.user.id }, function (err, profile) {
//       console.log('in here')
//       // get the index of the education you want to remove
//       const index = profile.education.map(element => element.id).indexOf(req.params.education_id)
//
//       // remove the education at the specified index
//       profile.education.splice(index, 1)
//
//       profile.save(function (err) {
//         res.json(profile)
//       })
//     })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server Error')
//   }
// })

module.exports = router
