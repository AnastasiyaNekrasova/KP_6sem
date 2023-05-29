import { Router } from 'express'
import {
    createPost,
    getAllPosts,
    getPostById,
    getMyPosts,
    removePost,
    updatePost,
    getPostComments,
} from '../controllers/postsController.js'
import { checkAuth } from '../utils/checkAuth.js'
import { checkRole } from '../utils/checkRole.js'
const router = new Router()

router.post('/', checkAuth, createPost)
router.get('/', checkAuth, getAllPosts)
router.get('/:id', checkAuth, getPostById)
router.put('/:id', checkAuth, updatePost)
router.get('/user/me', checkAuth, getMyPosts)
router.delete('/:id', checkAuth, removePost)
router.get('/comments/:id', checkAuth, getPostComments)

export default router
