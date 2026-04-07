import express from 'express'
import { getAdminListings, getAdminStats } from '../controllers/admin.controller.js'
import { adminOnly, protect } from '../middleware.js'

const router =  express.Router()

router.get('/stats',protect,adminOnly,getAdminStats)
router.get('/listings',protect,adminOnly,getAdminListings)
export default router