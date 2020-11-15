module.exports = {
    devServer: {
        port: 9000,
        disableHostCheck: true,
        before(app, server) {
            app.get('/123', (req, res) => {
                res.json({
                    data: [
                        {
                            id: 1,
                            title: 'web',
                            price: 19999
                        },
                        {
                            id: 2,
                            title: 'json',
                            price: 19990
                        }
                    ]
                })
            })
        }
    }
}
