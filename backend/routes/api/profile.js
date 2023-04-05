// backend/routes/api/profile.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Education, Experience, Skill } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get single user's profile
router.get('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    let foundUser = await User.findByPk(userId, {
        include: [
            {
                model: Experience
            },
            {
                model: Skill
            }
        ]
    });

    if (!foundUser) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "User couldn't be found",
            "statusCode": res.status
        })
    } else {
        return res.json(foundUser)
    }
});


module.exports = router;
