var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var Job = require("../models/Job");
var User = require("../models/user");


router.get('/', function (req, res, next) {
  Job.find(function (err, jobs) {
    res.send(jobs)
  })
})

router.post('/', function (req, res, next) {
  console.log(req.body)
  var newJob = Job(req.body)
  newJob.save(function (err, job) {
    if (err)
      console.log(err)
      res.send(job)

  })
})
module.exports = router;
