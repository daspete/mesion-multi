const path = require('path')

const rootPath = path.resolve(process.cwd())
const srcPath = rootPath

module.exports = {
    rootPath,
    srcPath,
    aliases: {
        '~~seeds': `${ srcPath }/seeds`,
        '~~core': `${ srcPath }/core`,
        '~~stacks': `${ srcPath }/stacks`,
        '~~shared': `${ srcPath }/shared`
    }
}