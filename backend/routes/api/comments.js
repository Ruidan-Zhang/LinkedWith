// backend/routes/api/comments.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateComment = [
    check('content')
      .exists({ checkFalsy: true })
      .withMessage('Comment can not be empty.'),
    handleValidationErrors
];

//Edit a Comment
router.put('/:commentId', validateComment, requireAuth, async (req, res, next) => {
    const { commentId } = req.params;
    const foundComment = await Comment.findByPk(commentId, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'image']
            }
        ]
    });
    const currentUser = req.user;

    if (!foundComment) {
        const err = new Error("Comment couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundComment.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        const { content } = req.body;
        foundComment.content = content;
        await foundComment.save();
        return res.json(foundComment);
    }
});

//Delete a comment
router.delete('/:commentId', requireAuth, async (req, res, next) => {
    const { commentId } = req.params;
    const foundComment = await Comment.findByPk(commentId);

    if (!foundComment) {
        const err = new Error("Comment couldn't be found");
        err.status = 404;
        next(err)
    } else if (req.user.id !== foundComment.userId) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        await foundComment.destroy();
        res.statusCode = 200;
        return res.json(foundComment)
    }
});


module.exports = router;
