import jwt from 'jsonwebtoken'

export default ({ user, config }) => {
    let jwtUser = {
        _id: user._id,
        email: user.email
    }

    let token = jwt.sign(
        { user: jwtUser },
        config.secret,
        { expiresIn: config.tokenLifeTime }
    )

    return token
}