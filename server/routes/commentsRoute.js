import { Router } from 'express'
const router = new Router()

import { checkAuth } from '../utils/checkAuth.js'
import { createComment } from '../controllers/commentsController.js'

router.post('/:relatedModel/:relatedId', checkAuth, createComment);

export default router
