import 'dotenv/config'

export default {
    globalName: 'mesionadmin',

    srcDir: 'stacks/admin/client',

    modulesDir: ['./node_modules'],

    buildDir: 'build/adminclient',
    build: {
        extractCSS: true,

        splitChunks: {
            layouts: true,
            pages: true,
            commons: true
        },

        loaders: {
            scss: {
                data: ``
            },
            vue: {
                compilerOptions: {
                    preserveWhitespace: false
                }
            }
        },
    },

    plugins: [
        '~~shared/client/plugins/axios'
    ],

    modules: [
        '@nuxtjs/axios'
    ],
}