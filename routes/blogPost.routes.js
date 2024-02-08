import express from 'express';
import blogFuncs from '../controllers/blogPost.controller.js';
import s3Functions from '../middleware/s3Bucket.js';

const router = express.Router();


router.route('/createPost').post(s3Functions.userMediaUpload, blogFuncs.postBlog);
router.route('/fetchBlog').get(blogFuncs.fetchBlog);
router.route('/createBlogTag').post(blogFuncs.createBlogTags);
router.route('/fetchBlogTag').get(blogFuncs.fetchBlogTag);

export default router;
