import { Router } from 'express'
import { register, login, getMe } from '../controllers/authController.js'
import { getAllUsers, setAvatar, logOut } from '../controllers/userController.js'

import { checkAuth } from '../utils/checkAuth.js'
import { checkRole } from '../utils/checkRole.js'

const router = new Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', checkAuth, getMe)

router.get("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
router.get("/logout/:id", logOut);

export default router
