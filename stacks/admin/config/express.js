import 'dotenv/config'

export default {
    ip: process.env.STACK_ADMIN_HOST || '127.0.0.1',
    port: process.env.STACK_ADMIN_PORT || '3000',
    logFormat: process.env.STACK_ADMIN_LOG_FORMAT || 'web',
    apiPrefix: process.env.STACK_ADMIN_PREFIX || '/api/v1/'
}