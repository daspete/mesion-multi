import 'dotenv/config'

export default {
    mongoUrl: process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/database',
    options: {
        debug: process.env.MONGO_DB_DEBUG == 'true',
        useNewUrlParser: true
    }
}