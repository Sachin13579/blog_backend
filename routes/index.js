import express from 'express';
import blogRoutes from "./blogPost.routes.js";

const router = express.Router();
router.use('/blog', blogRoutes);

export default router