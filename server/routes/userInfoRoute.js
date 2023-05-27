import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { checkRole } from '../utils/checkRole.js'

import { addPhotoToUser } from '../controllers/userInfoController.js'

const router = new Router()

router.post('/:id/photo', addPhotoToUser)

export default router