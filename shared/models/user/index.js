import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseAutopopulate from 'mongoose-autopopulate'

const UserSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        default: true
    },

    personal: {
        firstname: {
            type: String,
            default: ''
        },
        lastname: {
            type: String,
            default: ''
        },
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, {
    collection: 'users',
    timestamps: true
})

UserSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: true })
UserSchema.plugin(mongooseAutopopulate)

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
