import { Router } from 'express'
const router = new Router()
import { addMessage, getMessages } from '../controllers/messageController.js';

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);

export default router;
