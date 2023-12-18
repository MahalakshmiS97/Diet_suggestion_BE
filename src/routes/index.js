import express from 'express'
import userRoutes from './User.js'
import DietRoutes from './Dietchart.js'


const routers = express.Router()
routers.use('/user',userRoutes)
routers.use('/diet',DietRoutes)

export default routers