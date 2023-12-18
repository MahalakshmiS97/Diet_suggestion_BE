import express from 'express'
import DietController from '../controller/Dietchart.js'
import Auth from '../common/auth.js'

const router = express.Router()

router.post('/create',DietController.create)
router.get('/getdiet',Auth.validate,DietController.getDietchart)

export default router