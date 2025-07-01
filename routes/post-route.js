import { Router } from "express";
import { allPost, aPost, delPost, post, updatePost } from "../controllers/post-controller.js";
import { authenticate } from "../middleware/Auth.js";


export const postRoute = Router();

postRoute.get('/posts',allPost)
postRoute.get('/posts/:id',aPost)
postRoute.post('/posts',authenticate,post)
postRoute.put('/posts/:id',authenticate,updatePost)
postRoute.delete('/posts/:id',authenticate,delPost)