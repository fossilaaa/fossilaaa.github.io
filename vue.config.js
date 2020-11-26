module.exports = {
    devServer: {
        port: 9000,

        // *** 前端调试时注释掉proxy--开始 ***

        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:8080',
        //         ws: true,
        //         crossOrigin: true,
        //         pathRewrite: {
        //             '^/api': ''
        //         }
        //     }
        // }

        // *** 前端调试时注释掉proxy--结束 ***


        // *** 后端调试时注释掉before--开始 ***

        before(app, server) {
            [
                app.post('/api/login', (req, res) => {
                    res.json(data = {
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
                app.post('/api/register', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '注册成功'
                        },
                        data: {}
                    })
                }),
                app.post('/api/blogimages', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '图片上传成功'
                        },
                        data: [
                            [1, "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00292-4263.jpg"],
                            [2, "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00292-4263.jpg"]
                        ]
                    })
                }),
                app.get('/api/myinfo', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '用户信息获取成功'
                        },
                        data: {
                            userId: 1,
                            userName: 'a13956965930',
                            userPhone: '13956965930',
                            userGender: "0",
                            userBirth: "1998-03-01",
                            userAvatar: 'https://assets.leetcode-cn.com/aliyun-lc-upload/users/ma-hua/avatar_1603782096.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40'
                        }
                    })
                }),
                app.put('/api/myinfo', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '修改成功'
                        },
                        data: {
                            userId: 1,
                            userName: 'a13956965931',
                            userPhone: '13956965931',
                            userGender: "1",
                            userBirth: '1998-12-12',
                            userAvatar: 'https://assets.leetcode-cn.com/aliyun-lc-upload/users/ma-hua/avatar_1603782096.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40'
                        }
                    })
                }),
                app.get('/api/userblogdetailsinfo/1', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            status: '获取成功'
                        },
                        data: [
                            {info: '文章数目', value: 222},
                            {info: '阅读次数', value: 0},
                            {info: '评论次数', value: 232},
                            {info: '收藏次数', value: 22}
                        ]
                    })
                }),
                app.get('/api/classifications/1', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: "分类获取成功"
                        },
                        data: [
                            {
                                class: 'Python',
                                blogsInfo: [
                                    {blogId: 1, blogTitle: 'Python基础学习'},
                                    {blogId: 1, blogTitle: 'Python进阶学习'},
                                    {blogId: 1, blogTitle: 'Python高级学习'},
                                ]
                            },
                            {
                                class: 'Java',
                                blogsInfo: [
                                    {blogId: 1, blogTitle: 'Java基础学习'},
                                    {blogId: 1, blogTitle: 'Java进阶学习'},
                                    {blogId: 1, blogTitle: 'Java高级学习'},
                                ]
                            },
                            {
                                class: 'Go',
                                blogsInfo: [
                                    {blogId: 1, blogTitle: 'Go基础学习'},
                                    {blogId: 1, blogTitle: 'Go进阶学习'},
                                    {blogId: 1, blogTitle: 'Go高级学习'},
                                ],
                            }
                        ]
                    })
                }),
                app.get('/api/recentblogs/1', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '最近的博客信息获取成功'
                        },
                        data: [
                            {
                                blogId: 1,
                                blogTitle: 'Python从入门到放弃',
                                blogSummary: 'Python从入门到放弃xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                                blogCollectionsCount: 123,
                                blogViews: 3455,
                                blogCommentsCount: 34,
                                userId: 1,
                                userName: 'a13956965930'

                            },
                            {
                                blogId: 1,
                                blogTitle: 'Python从入门到放弃',
                                blogSummary: 'Python从入门到放弃xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                                blogCollectionsCount: 123,
                                blogViews: 3455,
                                blogCommentsCount: 34,
                                userId: 1,
                                userName: 'a13956965930'
                            },
                            {
                                blogId: 1,
                                blogTitle: 'Python从入门到放弃',
                                blogSummary: 'Python从入门到放弃xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                                blogCollectionsCount: 123,
                                blogViews: 3455,
                                blogCommentsCount: 34,
                                userId: 1,
                                userName: 'a13956965930'
                            },
                            {
                                blogId: 1,
                                blogTitle: 'Python从入门到放弃',
                                blogSummary: 'Python从入门到放弃xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                                blogCollectionsCount: 123,
                                blogViews: 3455,
                                blogCommentsCount: 34,
                                userId: 1,
                                userName: 'a13956965930'
                            }
                        ]
                    })
                }),
                app.get('/api/blog/1', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '成功'
                        },
                        data: {
                            user: {
                                userId: 1,
                                userName: 'a13956965930',
                                userAvatar: 'http://1224242424.jpg'
                            },
                            blog: {
                                blogTitle: '学习markdown',
                                blogHtmlContent: "<h1><a id=\"_0\"></a>这是标题</h1>\n<h2><a id=\"_1\"></a>这是一级菜单</h2>\n<h3><a id=\"markdown_2\"></a>今天我们要探讨markdown</h3>\n<ul>\n<li>#代表h1标签</li>\n<li>##代表h2标签</li>\n</ul>\n",
                                blogViews: 123,
                                blogCommentsCount: 23,
                                blogCollectionsCount: 8
                            }
                        }
                    })
                }),
                app.post('/api/blog', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '成功'
                        },
                        data: {}
                    })
                }),
                app.get('/api/recommendedusers', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: "成功"
                        },
                        data: [
                            {
                                userId: 1,
                                userName: '张三',
                                userAvatar: 'https://movie.douban.com/subject/1292052/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                userName: '李四',
                                userAvatar: 'https://movie.douban.com/subject/1295644/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                userName: '王五',
                                userAvatar: 'https://movie.douban.com/subject/1291546/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                userName: '马六',
                                userAvatar: 'https://movie.douban.com/subject/1292720/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                userName: '李华',
                                userAvatar: 'https://movie.douban.com/subject/1292063/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                userName: 'Spirited Away',
                                userAvatar: 'https://movie.douban.com/subject/1291561/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                name: '马龙',
                                userAvatar: 'https://movie.douban.com/subject/1295124/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                userName: '吴华',
                                userAvatar: 'https://movie.douban.com/subject/1292001/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                name: '阿萨',
                                userAvatar: 'https://movie.douban.com/subject/2131459/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            },
                            {
                                userId: 1,
                                userName: '郑芊',
                                userAvatar: 'https://movie.douban.com/subject/3541415/',
                                userViews: 3421,
                                userCollectionsCount: 12223
                            }
                        ]
                    })
                }),
                app.get('/api/comments/1', (req, res) => {
                    res.json({
                        status: {
                            code: 200,
                            msg: '成功'
                        },
                        data: [
                            {
                                user: {
                                    userId: 1,
                                    userName: 'a13956965930',
                                    userAvatar: 'http://1212212.jpg'
                                },
                                comment: '写得真好，不错'
                            },
                            {
                                user: {
                                    userId: 1,
                                    userName: 'a13956965930',
                                    userAvatar: 'http://1212212.jpg'
                                },
                                comment: '写得真好，不错'
                            },
                            {
                                user: {
                                    userId: 1,
                                    userName: 'a13956965930',
                                    userAvatar: 'http://1212212.jpg'
                                },
                                comment: '写得真好，不错'
                            }
                        ]
                    })
                })
            ]
        }

        // *** 后端调试时注释掉before--结束 ***
    }
}
