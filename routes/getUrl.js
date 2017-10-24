'use strict';

const express = require('express');
const router = require('express').Router();
const data = require('../models/data');

router.get('/url/:url', (req, res, next) => {
  data.putUrl((err, allData) => {
    if (err) {
      return next(err)
    };
    // const total = allData.length;
    res.json({
      questions: allData
    });
  });
});

module.exports = router;
