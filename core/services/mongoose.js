import mongoose from 'mongoose'

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: ' + err)
})

export default (config) => {
    const mongooseOptionKeys = Object.keys(config.options)

    mongooseOptionKeys.forEach((mongooseOptionKey) => {
        mongoose.set(mongooseOptionKey, config.options[mongooseOptionKey])
    })

    mongoose.connect(config.mongoUrl)

    console.log('Mongo DB connected')
} 