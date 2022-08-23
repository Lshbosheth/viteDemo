module.exports = {
    pages: {
        index: {
            entry: 'src/main.ts'
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};