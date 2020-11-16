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
        },
        before(app, server){
            app.post('/login', (req, res) =>{
                res.json({
                    status: {
                        code: 200,
                        msg: '登录成功'
                    },
                    data: {
                        userToken: '123.244.453400',
                        user: {
                            userId: 1,
                            userName: '13956965930',
                            userAvatar: 'https://assets.leetcode-cn.com/aliyun-lc-upload/users/ma-hua/avatar_1603782096.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40',
                        }
                    }
                })
            })
        },
        before(app, server){
            app.post('/register', (req, res) =>{
                res.json({
                    status: {
                        code: 200,
                        msg: '注册成功'
                    },
                    data: {}
                })
            })
        }
    }
}
