import { Router } from 'express'
import passport from 'passport'

import {
    index,
    create,
    login,
    me,
    refreshToken
} from './controller'

const AuthMiddleware = passport.authenticate('jwt', { session: false })
const router = new Router()

router.get('/', AuthMiddleware, index)
router.post('/', AuthMiddleware, create)
router.post('/login', login)
router.get('/me', AuthMiddleware, me)
router.post('/refreshToken', AuthMiddleware, refreshToken)


export default router
