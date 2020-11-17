module.exports = {
    devServer: {
        port: 9000,
        disableHostCheck: true,
        before(app, server) {
            [
                app.get('/api/v1/123', (req, res) => {
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
                }),
                app.post('/api/v1/logintest', (req, res) => {
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
                }),
                app.post('/api/v1/register', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '注册成功'
                        },
                        data: {}
                    })
                }),
                app.post('/api/v1/blogimages', (req, res)=>{
                    res.json({
                        status:{
                            code: 200,
                            msg: '图片上传成功'
                        },
                        data: [
                            [1, "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00292-4263.jpg"],
                            [2, "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00292-4263.jpg"]
                        ]
                    })
                }),
                app.get('/api/v1/userinfo', (req, res)=>{
                    res.json({
                        status: {
                            code: 200,
                            msg: '用户信息获取成功'
                        },
                        data: {
                            userId: 1,
                            userName: 'a13956965930',
                            userPhone: '13956965930',
                            userSex: 0,
                            userAvatar: 'https://assets.leetcode-cn.com/aliyun-lc-upload/users/ma-hua/avatar_1603782096.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40'
                        }
                    })
                }),
                app.put('/api/v1/userinfo', (req, res)=>{
                    console.log(req.body);
                    res.json({
                        status: {
                            code: 200,
                            msg: '修改成功'
                        },
                        data: {
                            userId: 1,
                            userName: 'a13956965931',
                            userPhone: '13956965931',
                            userSex: 1,
                            userAvatar: 'https://assets.leetcode-cn.com/aliyun-lc-upload/users/ma-hua/avatar_1603782096.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40'
                        }
                    })
                })
            ]
        }
    }
}
