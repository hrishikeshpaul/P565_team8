var passport = require('passport')
require('../config/passport')(passport)
var express = require('express')
var router = express.Router()
var User = require('../models/user');
var Job = require('../models/Job')


router.get('/:id', function (req, res, next) {
  var userObj = {}
  var jobObj = {}
  User.findOne({_id: req.params.id})
    .populate('education')
    .populate('experience')
    .exec(function (err, success) {
      if (err)
        return res.status(400).send('Error')
      return res.status(200).send(success)
    })
})

router.patch('/:id', function (req, res, next) {

  User.updateOne({_id: req.params.id}, {$set: req.body}, function (err, success) {
    if (err)
      return res.status(400).send('Error inn updating user')
    return res.status(204).send(JSON.stringify(success))
  })
})

module.exports = router
