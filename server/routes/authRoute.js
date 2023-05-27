import { Router } from 'express'
import { register, login, getMe, getUsers } from '../controllers/authController.js'

import { checkAuth } from '../utils/checkAuth.js'
import { checkRole } from '../utils/checkRole.js'

const router = new Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', checkAuth, getMe)
router.get('/users', getUsers)

export default router
