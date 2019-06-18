require('dotenv').config()
const path = require('path')
const fs = require('fs')

const { rootPath, srcPath, aliases } = require('./core/resolvers/path')

let entry = {}

if(typeof process.env.BACKPACK_ENV !== 'undefined'){
    switch(process.env.BACKPACK_ENV){
        case 'seeder':
            entry.input = `core/tools/seeder/index.js`,
            entry.output = 'build/tools/seeder'
        break
    }    
}else{
    let stack = 'api'
    if(typeof process.argv[2] !== 'undefined'){ stack = process.argv[2].toLowerCase() }

    if(!fs.existsSync(`${ srcPath }/stacks/${ stack }/index.js`)){
        console.error(`The stack "${ stack }" was not found`)
        process.exit(0)
    }

    entry = { input: `stacks/${ stack }/index.js`, output: `build/${ stack }` }
}




module.exports = {
    webpack: (config, options, webpack) => {
        config.output.path = path.normalize(`${ rootPath }/${ entry.output }`)
        config.entry.main = [path.normalize(`${ srcPath }/${ entry.input }`)]

        config.resolve = {
            alias: aliases
        }

        return config
    }
}