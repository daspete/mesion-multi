import { Router } from 'express'
import passport from 'passport'

import {
    index,
    show,
    create,
    update,
    destroy
} from './controller'

const AuthMiddleware = passport.authenticate('jwt', { session: false })
const router = new Router()

router.get('/', AuthMiddleware, index)
router.get('/:id', AuthMiddleware, show)
router.post('/', AuthMiddleware, create)
router.put('/:id', AuthMiddleware, update)
router.delete('/:id', AuthMiddleware, destroy)

export default router
