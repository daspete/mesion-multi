import passport from 'passport'

import UserModel from '~~shared/models/user'

import GetUserByToken from '~~core/utils/GetUserByToken'
import HashPassword from '~~core/utils/HashPassword'
import CreateJWTToken from '~~core/utils/CreateJWTToken'

import authConfig from '~~shared/config/auth'

const UserTransformer = (user) => {
    user.password = undefined
    user.__v = undefined
    return user
}

export const index = async (req, res, next) => {
    let users = await UserModel.find({})
    res.json(users.map((user) => {
        return UserTransformer(user)
    }))
}

export const create = async (req, res, next) => {
    try{
        let userData = req.body
        userData.password = await HashPassword(userData.password)
        let user = await new UserModel(req.body).save()
        res.json(user)
    }catch(err){
        res.status(500).json(err)
    }
}

export const login = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try{
            if(!user) return res.status(401).json(info)
            if(err) return next(new Error(info))

            req.login(user, { session: false }, async (error) => {
                if(error) return next(error)
                let token = CreateJWTToken({ user, config: authConfig })
                return res.json({ token })
            })
        }catch(err){
            return next(err)
        }
    })(req, res, next)
}

export const me = async (req, res, next) => {
    let user = await GetUserByToken({ authorization: req.headers.authorization, config: authConfig, UserModel: UserModel })
    res.json(UserTransformer(user))
}


export const refreshToken = async (req, res, next) => {
    let user = await GetUserByToken({ authorization: req.headers.authorization, config: authConfig, UserModel: UserModel })
    let token = CreateJWTToken({ user, config: authConfig })
    res.json({ token })

}