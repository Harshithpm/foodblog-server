const router = require('express').Router();

const Post = require('../models/Post');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  Post.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post('/', (req, res) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    body: req.body.title,
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Handling POST requests to /posts',
        post: post,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: 'Failed to create post',
        err: err,
      });
    });
});

router.get('/:postId', (req, res) => {
  Post.findById(req.params.postId)
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Couldn't get post",
        err: err,
      });
    });
});

module.exports = router;
