// backend/routes/api/profile.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();






module.exports = router;
