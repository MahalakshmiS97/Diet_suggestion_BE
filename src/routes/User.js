import express from 'express'
import userController from '../controller/User.js'
import Auth from '../common/auth.js'


const router = express.Router()

router.post('/sign',userController.create)
router.post('/login',userController.login)
router.get('/getuser',Auth.validate,Auth.adminGaurd,userController.getAlluser)
router.post('/forget',userController.forgotPassword)
router.post('/resetpassword/:id/:token',userController.resetPassword)
export default router