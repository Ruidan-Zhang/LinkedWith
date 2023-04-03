// backend/routes/api/posts.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Post, Comment } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js');

const router = express.Router();

const validatePost = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Content can not be empty.'),
  handleValidationErrors
];

const validateComment = [
    check('content')
      .exists({ checkFalsy: true })
      .withMessage('Comment can not be empty.'),
    handleValidationErrors
];

//Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.findAll({
      include: [
        {
            model: User
        }
      ]
    });

    const postsArr = [];

    for (let post of posts) {
        post = post.toJSON();
        let numComments = await Comment.count({
            where: {
                postId: post.id
            }
        });
        post.numComments = numComments;
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
        post = post.toJSON();
        let numComments = await Comment.count({
            where: {
                postId: postId
            }
        });
        post.numComments = numComments;
        return res.json(post)
    }
});

//Create a post
router.post('/', singleMulterUpload('image'), validatePost, requireAuth, async (req, res) => {
    const { content } = req.body;
    let postImage;

    if (req.file) {
        postImage = await singlePublicFileUpload(req.file);
    };

    if (postImage) {
        let newPost = await Post.create({
            userId: req.user.id,
            content,
            image: postImage
        });
        newPost = newPost.toJSON();
        newPost.User = {};
        newPost.User.firstName = req.user.firstName;
        newPost.User.lastName = req.user.lastName;
        newPost.User.image = req.user.image;
        res.statusCode = 201;
        return res.json(newPost);
    } else {
        let newPost = await Post.create({
            userId: req.user.id,
            content
        });
        newPost = newPost.toJSON();
        newPost.User = {};
        newPost.User.firstName = req.user.firstName;
        newPost.User.lastName = req.user.lastName;
        newPost.User.image = req.user.image;
        res.statusCode = 201;
        return res.json(newPost);
    }
});

//Edit a post
router.put('/:postId', singleMulterUpload('image'), validatePost, requireAuth, async (req, res) => {
    const postId = req.params.postId;
    let foundPost = await Post.findByPk(postId, {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName', 'image']
            }
        ]
    });

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
        const { image, content } = req.body;
        let postImage;

        if (req.file) {
            postImage = await singlePublicFileUpload(req.file);
        };

        if (postImage) {
            foundPost.update({
                userId: req.user.id,
                content,
                image: postImage
            });
            res.statusCode = 201;
            return res.json(foundPost);
        } else {
            foundPost.update({
                userId: req.user.id,
                content,
                image
            });
            res.statusCode = 201;
            return res.json(foundPost);
        }
    }
});

//Delete a Post
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

//Get all Comments by a Post's id
router.get('/:postId/comments', async (req, res, next) => {
    const { postId } = req.params;
    const foundPost = await Post.findByPk(postId);

    if (!foundPost) {
        const err = new Error("Post couldn't be found");
        err.status = 404;
        next(err)
    } else {
        const commentArr = [];
        const foundPostComments = await Comment.findAll({
            where: {
                postId: foundPost.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'image']
                }
            ]
        });

        for (let foundPostComment of foundPostComments) {
            foundPostComment = foundPostComment.toJSON();
            commentArr.push(foundPostComment);
        }

        return res.json({commentArr})
    }
});

//Create a Comment for a Post based on the Post's id
router.post('/:postId/comments', validateComment, requireAuth, async (req, res, next) => {
    const { postId } = req.params;
    const foundPost = await Post.findByPk(postId);

    const currentUser = await User.findByPk(req.user.id);

    if (!foundPost) {
        const err = new Error("Post couldn't be found");
        err.status = 404;
        next(err)
    } else {
        const { content } = req.body;
        let newComment = await Comment.create({
            userId: req.user.id,
            postId: foundPost.id,
            content
        });

        newComment = newComment.toJSON();
        newComment.User = {};
        newComment.User.id = currentUser.id;
        newComment.User.firstName = currentUser.firstName;
        newComment.User.lastName = currentUser.lastName;
        newComment.User.image = currentUser.image;
        res.statusCode = 201;
        return res.json(newComment);
    }
});


module.exports = router;
