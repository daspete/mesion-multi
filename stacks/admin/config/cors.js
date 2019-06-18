import 'dotenv/config'

export default {
    origin: process.env.STACK_ADMIN_CORS_ORIGIN || '*',
    optionsSuccessStatus: process.env.STACK_ADMIN_CORS_OPTIONS_SUCCESS_STATUS || 200
}
