// backend/routes/api/profile.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Education, Experience, Skill, Like } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateExperience = [
    check('companyName')
      .exists({ checkFalsy: true })
      .withMessage('Company name can not be empty.'),
      check('jobTitle')
      .exists({ checkFalsy: true })
      .withMessage('Job Title can not be empty.'),
      check('startedAt')
      .exists({ checkFalsy: true })
      .withMessage('Start time can not be empty.'),
      check('endedAt')
      .exists({ checkFalsy: true })
      .withMessage('End time can not be empty.'),
    handleValidationErrors
];

const validateEducation = [
    check('schoolName')
      .exists({ checkFalsy: true })
      .withMessage('School name can not be empty.'),
      check('startedAt')
      .exists({ checkFalsy: true })
      .withMessage('Start time can not be empty.'),
      check('endedAt')
      .exists({ checkFalsy: true })
      .withMessage('End time can not be empty.'),
    handleValidationErrors
];

const validateSkill = [
    check('content')
      .exists({ checkFalsy: true })
      .withMessage('Skill content can not be empty.'),
    handleValidationErrors
];

//Get single user's profile
router.get('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    let foundUser = await User.findByPk(userId, {
        include: [Education, Experience, Skill, Like]
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

//================================Experiences routes================================

//Get current user's experiences
router.get('/:userId/experience', requireAuth, async (req, res) => {
    const userId = req.params.userId;

    const allExperiences = await Experience.findAll({
        where: {
            userId: userId
        }
    });

    return res.json(allExperiences);
});

//Create an experience
router.post('/:userId/experience', validateExperience, requireAuth, async (req, res) => {
    const { companyName, jobTitle, startedAt, endedAt } = req.body;
    const userId = req.params.userId;
    const foundUser = await User.findByPk(userId);

    if (!foundUser) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "User couldn't be found",
            "statusCode": res.status
        })
    } else if (foundUser.id !== req.user.id) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Forbidden",
            "statusCode": res.status
        })
    } else {
        const newExperience = await Experience.create({
            userId: req.user.id,
            companyName,
            jobTitle,
            startedAt,
            endedAt
        });

        res.statusCode = 201;
        return res.json(newExperience);
    }
});

//Edit an experience
router.put('/:userId/experience/:experienceId', validateExperience, requireAuth, async (req, res, next) => {
    const { userId, experienceId } = req.params;
    const foundExperience = await Experience.findByPk(experienceId);
    const foundUser = await User.findByPk(userId);

    if (!foundExperience) {
        const err = new Error("Experience couldn't be found");
        err.status = 404;
        next(err)
    } else if (!foundUser) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundExperience.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        const { companyName, jobTitle, startedAt, endedAt } = req.body;
        foundExperience.update({
            ...foundExperience,
            companyName,
            jobTitle,
            startedAt,
            endedAt
        })
        return res.json(foundExperience);
    }
});

//Delete an experience
router.delete('/:userId/experience/:experienceId', requireAuth, async (req, res, next) => {
    const { userId, experienceId } = req.params;
    const foundExperience = await Experience.findByPk(experienceId);
    const foundUser = await User.findByPk(userId);

    if (!foundExperience) {
        const err = new Error("Experience couldn't be found");
        err.status = 404;
        next(err)
    } else if (!foundUser) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundExperience.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        await foundExperience.destroy();
        res.statusCode = 200;
        return res.json(foundExperience)
    }
});

//================================Educations routes================================

//Get current user's educations
router.get('/:userId/education', requireAuth, async (req, res) => {
    const userId = req.params.userId;

    const allEducations = await Education.findAll({
        where: {
            userId: userId
        }
    });

    return res.json(allEducations);
});

//Create an education
router.post('/:userId/education', validateEducation, requireAuth, async (req, res) => {
    const { schoolName, startedAt, endedAt } = req.body;
    const userId = req.params.userId;
    const foundUser = await User.findByPk(userId);

    if (!foundUser) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "User couldn't be found",
            "statusCode": res.status
        })
    } else if (foundUser.id !== req.user.id) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Forbidden",
            "statusCode": res.status
        })
    } else {
        const newEducation = await Education.create({
            userId: req.user.id,
            schoolName,
            startedAt,
            endedAt
        });

        res.statusCode = 201;
        return res.json(newEducation);
    }
});

//Edit an education
router.put('/:userId/education/:educationId', validateEducation, requireAuth, async (req, res, next) => {
    const { userId, educationId } = req.params;
    const foundEducation = await Education.findByPk(educationId);
    const foundUser = await User.findByPk(userId);

    if (!foundEducation) {
        const err = new Error("Education couldn't be found");
        err.status = 404;
        next(err)
    } else if (!foundUser) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundEducation.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        const { schoolName, startedAt, endedAt } = req.body;
        foundEducation.update({
            ...foundEducation,
            schoolName,
            startedAt,
            endedAt
        })
        return res.json(foundEducation);
    }
});

//Delete an education
router.delete('/:userId/education/:educationId', requireAuth, async (req, res, next) => {
    const { userId, educationId } = req.params;
    const foundEducation = await Education.findByPk(educationId);
    const foundUser = await User.findByPk(userId);

    if (!foundEducation) {
        const err = new Error("Education couldn't be found");
        err.status = 404;
        next(err)
    } else if (!foundUser) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundEducation.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        await foundEducation.destroy();
        res.statusCode = 200;
        return res.json(foundEducation)
    }
});

//================================Skills routes================================

//Get current user's skills
router.get('/:userId/skill', requireAuth, async (req, res) => {
    const userId = req.params.userId;

    const allSkills = await Skill.findAll({
        where: {
            userId: userId
        }
    });

    return res.json(allSkills);
});

//Create a skill
router.post('/:userId/skill', validateSkill, requireAuth, async (req, res) => {
    const { content } = req.body;
    const userId = req.params.userId;
    const foundUser = await User.findByPk(userId);

    if (!foundUser) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "User couldn't be found",
            "statusCode": res.status
        })
    } else if (foundUser.id !== req.user.id) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Forbidden",
            "statusCode": res.status
        })
    } else {
        const newSkill = await Skill.create({
            userId: req.user.id,
            content
        });

        res.statusCode = 201;
        return res.json(newSkill);
    }
});

//Edit a skill
router.put('/:userId/skill/:skillId', validateSkill, requireAuth, async (req, res, next) => {
    const { userId, skillId } = req.params;
    const foundSkill = await Skill.findByPk(skillId);
    const foundUser = await User.findByPk(userId);

    if (!foundSkill) {
        const err = new Error("Skill couldn't be found");
        err.status = 404;
        next(err)
    } else if (!foundUser) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundSkill.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        const { content } = req.body;
        foundSkill.update({
            ...foundSkill,
            content
        })
        return res.json(foundSkill);
    }
});

//Delete a skill
router.delete('/:userId/skill/:skillId', requireAuth, async (req, res, next) => {
    const { userId, skillId } = req.params;
    const foundSkill = await Skill.findByPk(skillId);
    const foundUser = await User.findByPk(userId);

    if (!foundSkill) {
        const err = new Error("Skill couldn't be found");
        err.status = 404;
        next(err)
    } else if (!foundUser) {
        const err = new Error("User couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundSkill.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        await foundSkill.destroy();
        res.statusCode = 200;
        return res.json(foundSkill)
    }
});


module.exports = router;
