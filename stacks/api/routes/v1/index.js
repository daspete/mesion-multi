import { Router } from 'express'

import user from './user'

const router = new Router()

router.use('/user', user)
router.get('/', async (req, res, next) => { res.json({ hello: 'api' }) })

export default router