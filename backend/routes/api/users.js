// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Experience, Education, Skill } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Must provide a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Must provide a last name'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// Get all users
router.get('/', async (req, res) => {
  const allUsers = await User.findAll({
    include: [
      {
        model: Education
      },
      {
        model: Skill
      }
    ]
  });

  const usersArr = [];

  for (let user of allUsers) {
    user = user.toJSON();
    usersArr.push(user);
  }

  return res.json(usersArr);
});

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, image } = req.body;
      const user = await User.signup({ firstName, lastName, email, password, image });

      await setTokenCookie(res, user);

      return res.json({
        user: user
      });
    }
);

module.exports = router;
