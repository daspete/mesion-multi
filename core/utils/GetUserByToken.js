import jwt from 'jsonwebtoken'

export default async ({ authorization, UserModel }) => {
    let token = jwt.decode(authorization.replace('Bearer ', ''))

    let user = token.user
    user = await UserModel.findOne({ _id: user._id })
    user.__v = undefined
    user.password = undefined
    return user
}
