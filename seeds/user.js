import UserModel from '~~shared/models/user'
import HashPassword from '~~core/utils/HashPassword'

export default async () => {
    let users = [{
        active: true,
        personal: {
            firstname: 'Super',
            lastname: 'User'
        },
        email: 'admin@local.host',
        password: 'admin'
    }]

    for (let i = 0; i < users.length; i++) {
        let userData = users[i]
        userData.password = await HashPassword(userData.password)
        let user = await new UserModel(userData).save()
        console.log('new user created: ', user)
    }
}