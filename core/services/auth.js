import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'

export default (UserModel, config) => {
    passport.use('login', new LocalStrategy({
        usernameField: config.usernameField,
        passwordField: config.passpordField
    }, async (username, password, done) => {
        try{
            const userQuery = { active: true }
            userQuery[config.usernameField] = { $regex: new RegExp('^' + username + '$', 'i') }

            const user = await UserModel.findOne(userQuery)

            if(!user) return done(null, false, { message: 'notfound' })

            const passwordCheck = await bcrypt.compare(password, user[config.passwordField])
            if(!passwordCheck) return done(null, false, { message: 'wrongpass' })

            return done(null, user, { message: 'success' })
        }catch(err){
            return done(err)
        }
    }))


    passport.use(new JWTStrategy({
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (token, done) => {
        try{
            return done(null, token.user)
        }catch(err){
            return done(err)
        }
    }))
}