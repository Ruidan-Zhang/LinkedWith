// backend/routes/api/posts.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validatePost = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Content can not be empty.'),
  handleValidationErrors
];

//Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.findAll({
      include: [
        {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
      ]
    });

    const postsArr = [];

    for (let post of posts) {
        post = post.toJSON();
        postsArr.push(post);
    }

    return res.json(postsArr);
});

//Get details for a single post
router.get('/:postId', async (req, res, next) => {
    const postId = req.params.postId;
    let post = await Post.findByPk(postId);

    if (!post) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Post couldn't be found",
            "statusCode": res.status
        })
    } else {
        return res.json(post)
    }
});

//Create a post
router.post('/', validatePost, requireAuth, async (req, res) => {
    const { content, image } = req.body;

    if (image) {
        const newPost = await Post.create({
            userId: req.user.id,
            content,
            image
        });
        res.statusCode = 201;
        return res.json(newPost);
    } else {
        const newPost = await Post.create({
            userId: req.user.id,
            content
        });
        res.statusCode = 201;
        return res.json(newPost);
    }
});

//Edit a post
router.put('/:postId', validatePost, requireAuth, async (req, res) => {
    const postId = req.params.postId;
    const foundPost = await Post.findByPk(postId);

    if (!foundPost) {
        res.status = 404;
        res.statusCode = 404;
        return res.json({
            "message": "Post couldn't be found",
            "statusCode": res.status
        })
    } else if (req.user.id !== foundPost.userId) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Forbidden",
            "statusCode": res.status
        })
    } else {
        const { content, image } = req.body;

        if (image) {
            foundPost.update({
                userId: req.user.id,
                content,
                image
            });
            res.statusCode = 201;
            return res.json(foundPost);
        } else {
            foundPost.update({
                userId: req.user.id,
                content
            });
            res.statusCode = 201;
            return res.json(foundPost);
        }
    }
});

//Delete a Spot
router.delete('/:postId', requireAuth, async (req, res) => {
    const { postId } = req.params;
    const foundPost = await Post.findByPk(postId);

    if (!foundPost) {
        res.statusCode = 404;
        return res.json({
            "message": "Post couldn't be found",
            "statusCode": 404
        })
    } else if (req.user.id !== foundPost.userId) {
        res.status = 403;
        res.statusCode = 403;
        return res.json({
            "message": "Forbidden",
            "statusCode": res.status
        })
    } else {
        await foundPost.destroy();
        res.statusCode = 200;
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
});


module.exports = router;
