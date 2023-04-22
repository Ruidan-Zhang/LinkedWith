// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js');

const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user: user
      });
    }
);

//Edit user profile
router.put('/', singleMulterUpload('image'), requireAuth, async (req, res) => {
  const currentUser = req.user;

  if (!currentUser) {
      res.status = 404;
      res.statusCode = 404;
      return res.json({
          "message": "Please log in first",
          "statusCode": res.status
      })
  } else {
      const { image, firstName, lastName, occupation } = req.body;
      let userImage;

      if (req.file) {
        userImage = await singlePublicFileUpload(req.file);
      };

      if (userImage) {
        currentUser.update({
              userId: req.user.id,
              firstName,
              lastName,
              occupation,
              image: userImage
          });
          res.statusCode = 201;
          return res.json(currentUser);
      } else {
        currentUser.update({
              userId: req.user.id,
              firstName,
              lastName,
              occupation,
              image
          });
          res.statusCode = 201;
          return res.json(currentUser);
      }
  }
});

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
);

module.exports = router;
