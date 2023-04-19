// backend/routes/api/likes.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post, Like } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Get likes for a post
router.get('/posts/:postId', async (req, res, next) => {
    const postId = req.params.postId;
    let foundPost = await Post.findByPk(postId, {
        include: [Like]
    });

    if (!foundPost) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Post couldn't be found",
            "statusCode": res.status
        })
    } else {
        return res.json(foundPost)
    }
});

//Get likes for a user
router.get('/users/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    let foundUser = await User.findByPk(userId, {
        include: [Like]
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

//Create a like
router.post('/:postId', requireAuth, async (req, res) => {
    const postId = req.params.postId;
    const foundPost = await Post.findByPk(postId, {
        include: [Like]
    });

    if (!foundPost) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Post couldn't be found",
            "statusCode": res.status
        })
    } else if (!foundPost.Likes.find(like => like.userId === req.user.id)) {
        const newLike = await Like.create({
            userId: req.user.id,
            postId: postId,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        });

        res.statusCode = 201;
        return res.json(newLike);
    } else {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "User already liked current post.",
            "statusCode": res.status
        })
    }
});

//Delete a like
router.delete('/:likeId', requireAuth, async (req, res, next) => {
    const likeId = req.params.likeId;
    const foundLike = await Like.findByPk(likeId);

    if (!foundLike) {
        const err = new Error("Like couldn't be found");
        err.status = 404;
        next(err)
    } else if (foundLike.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        next(err)
    } else {
        await foundLike.destroy();
        res.statusCode = 200;
        return res.json(foundLike);
    }
});


module.exports = router;
