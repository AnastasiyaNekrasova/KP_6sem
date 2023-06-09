import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { checkRole } from '../utils/checkRole.js'

import { addPlantToUser, getUserPlants, removeUserPlant, changeLastWatering, changeWateringInterval, getUserInfo } from '../controllers/userPlantsController.js'

const router = new Router()

router.post('/add', addPlantToUser)
router.get('/', getUserPlants)
router.get('/getUserInfo/:id', getUserInfo)
router.put('/', changeLastWatering)
router.put('/interval', changeWateringInterval)
router.delete('/delete/:userId/:plantId', checkAuth, removeUserPlant)

export default router