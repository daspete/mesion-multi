import commander from 'commander'
import mongoose from '~~core/services/mongoose'

import mongooseConfig from '~~shared/config/mongoose'

mongoose(mongooseConfig)

commander
    .arguments('<seed>')
    .action(async (seed) => {
        try {
            let seeder = require('~~seeds/' + seed + '.js').default
            await seeder()
            process.exit(0)
        } catch (err) {
            console.log(err)
            process.exit(1)
        }
    })

commander.parse(process.argv)