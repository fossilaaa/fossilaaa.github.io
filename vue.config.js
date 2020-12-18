module.exports = {
    devServer: {
        port: 9000,

        // *** 前端调试时注释掉proxy--开始 ***

        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                ws: true,
                crossOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },

        // *** 前端调试时注释掉proxy--结束 ***


        // *** 后端调试时注释掉before--开始 ***

        // before(app, server) {
        //     [
        //         // 用户模块
        //         app.post('/api/register', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '注册成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 注册
        //         app.post('/api/login', (req, res) => {
        //             res.json(data = {
        //                 status: {
        //                     code: 200,
        //                     msg: '登录成功'
        //                 },
        //                 data: {
        //                     userToken: '123.244.453400',
        //                     user: {
        //                         userId: 1,
        //                         userName: '13912345678',
        //                         userAvatar: 'https://assets.leetcode-cn.com/aliyun-lc-upload/users/ma-hua/avatar_1603782096.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40',
        //                     }
        //                 }
        //             })
        //         }),  // 登录
        //         app.get('/api/myinfo/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '用户信息获取成功'
        //                 },
        //                 data: {
        //                     userId: 1,
        //                     userName: 'a13912345678',
        //                     userPhone: '13912345678',
        //                     userGender: "男",
        //                     userBirth: "1998-03-11",
        //                     userAvatar: 'https://assets.leetcode-cn.com/aliyun-lc-upload/users/ma-hua/avatar_1603782096.png?x-oss-process=image%2Fresize%2Ch_40%2Cw_40'
        //                 }
        //             })
        //         }),  // 获取我的信息
        //         app.put('/api/myinfo/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '修改成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 修改我的信息
        //         app.get('/api/userblogdetailsinfo/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     status: '获取成功'
        //                 },
        //                 data: [
        //                     {info: '文章数目', value: 222},
        //                     {info: '阅读次数', value: 0},
        //                     {info: '评论次数', value: 232},
        //                     {info: '收藏次数', value: 22}
        //                 ]
        //             })
        //         }),  // 获取用户博客总体信息
        //         app.get('/api/noticescount/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: {
        //                     noticesCount: 12
        //                 }
        //             })
        //         }),  // 获取评论、收藏通知数
        //         app.get('/api/unsawnotices/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: {
        //                     blogCollectionNotices: [
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogTitle: 'Python'
        //                             },
        //
        //                         },
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogTitle: 'Python'
        //                             },
        //
        //                         },
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogTitle: 'Python'
        //                             },
        //                         }
        //                     ],
        //                     blogCommentNotices: [
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogTitle: 'Python'
        //                             },
        //                             comment: "写得不错"
        //
        //                         },
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogTitle: 'Python'
        //                             },
        //                             comment: "写得不错"
        //
        //                         },
        //                         {
        //                             user: {
        //                                 userId: 1,
        //                                 userName: 'a13912345678',
        //                                 userAvatar: 'http:/dfsdfsdf.jpg'
        //                             },
        //                             blog: {
        //                                 blogId: 1,
        //                                 blogTitle: 'Python'
        //                             },
        //                             comment: "写得不错"
        //
        //                         },
        //                     ]
        //                 }
        //             })
        //         }),   // 获取用户未查看的评论、收藏信息
        //
        //         // 博客模块
        //         app.get('/api/classifications/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: "分类获取成功"
        //                 },
        //                 data: [
        //                     {
        //                         class: 'Python',
        //                         blogsInfo: [
        //                             {blogId: 1, blogTitle: 'Python基础学习'},
        //                             {blogId: 1, blogTitle: 'Python进阶学习'},
        //                             {blogId: 1, blogTitle: 'Python高级学习'},
        //                         ]
        //                     },
        //                     {
        //                         class: 'Java',
        //                         blogsInfo: [
        //                             {blogId: 1, blogTitle: 'Java基础学习'},
        //                             {blogId: 1, blogTitle: 'Java进阶学习'},
        //                             {blogId: 1, blogTitle: 'Java高级学习'},
        //                         ]
        //                     },
        //                     {
        //                         class: 'Go',
        //                         blogsInfo: [
        //                             {blogId: 1, blogTitle: 'Go基础学习'},
        //                             {blogId: 1, blogTitle: 'Go进阶学习'},
        //                             {blogId: 1, blogTitle: 'Go高级学习'},
        //                         ],
        //                     }
        //                 ]
        //             })
        //         }),  // 获取分类及文章
        //         app.post('/api/blogimages', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '图片上传成功'
        //                 },
        //                 data: {
        //                     blogId: 1,
        //                     blogPictures: [
        //                         [1, "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00292-4263.jpg"],
        //                         [2, "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00292-4263.jpg"
        //                         ]
        //                     ]
        //                 }
        //             })
        //         }),  // 保存图片
        //         app.get('/api/recentblogs/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '最近的博客信息获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     }
        //                 ]
        //             })
        //         }),  // 获取当前用户最近的博客
        //         app.get('/api/blog/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '成功'
        //                 },
        //                 data: {
        //                     user: {
        //                         userId: 1,
        //                         userName: 'a13912345678',
        //                         userAvatar: 'http://1224242424.jpg'
        //                     },
        //                     blog: {
        //                         blogTitle: '学习markdown',
        //                         blogHtmlContent: "<h1><a id=\"_0\"></a>这是标题</h1>",
        //                         blogTags: [1, 2],
        //                         blogClassification: 1,
        //                         blogViews: 123,
        //                         blogCommentsCount: 23,
        //                         blogCollectionsCount: 8,
        //                         blogTime: '2020.12.12.2312xxxx'
        //                     }
        //                 }
        //             })
        //         }),  // 获取博客
        //         app.post('/api/blog', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 添加博客
        //         app.get('/api/blogsoftag/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678',
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     }
        //                 ]
        //             })
        //         }),  // 获取根据标签搜索的博客
        //         app.get('/api/tags', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         tagId: 1,
        //                         tagName: 'Python'
        //                     },
        //                     {
        //                         tagId: 2,
        //                         tagName: 'Go'
        //                     },
        //                     {
        //                         tagId: 3,
        //                         tagName: 'Java'
        //                     }
        //                 ]
        //             })
        //         }),
        //         app.get('/api/blogsofauthor/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     }
        //                 ]
        //             })
        //         }),  // 获取根据作者搜索的博客
        //         app.get('/api/collections/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678',
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     }
        //                 ]
        //             })
        //         }),  // 获取博客收藏
        //         app.post('/api/collection', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '收藏成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 收藏博客
        //         app.delete('/api/collection', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '取消成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 取消收藏博客
        //         app.delete('/api/blog/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: "删除成功"
        //                 },
        //                 data: {}
        //             })
        //         }),  // 删除博客
        //
        //         // 评论模块
        //         app.get('/api/comments/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '成功'
        //                 },
        //                 data: [
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'http://1212212.jpg'
        //                         },
        //                         comment: '写得真好，不错'
        //                     },
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'http://1212212.jpg'
        //                         },
        //                         comment: '写得真好，不错'
        //                     },
        //                     {
        //                         user: {
        //                             userId: 1,
        //                             userName: 'a13912345678',
        //                             userAvatar: 'http://1212212.jpg'
        //                         },
        //                         comment: '写得真好，不错'
        //                     }
        //                 ]
        //             })
        //         }),  // 获取评论
        //         app.post('/api/comment', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '评论成功'
        //                 },
        //                 data: {}
        //             })
        //         }),  // 发表评论
        //
        //         // 分类模块
        //         app.get('/api/classificationsnames/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: "获取成功"
        //                 },
        //                 data: [
        //                     {
        //                         classificationId: 1,
        //                         classificationName: 'Python'
        //                     },
        //                     {
        //                         classificationId: 2,
        //                         classificationName: 'Java'
        //                     },
        //                     {
        //                         classificationId: 3,
        //                         classificationName: 'Java'
        //                     }
        //                 ]
        //             })
        //         }),  // 只返回分类名称
        //         app.post('/api/classification', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: "添加成功"
        //                 },
        //                 data: {
        //                     classificationId: 4,
        //                     classificationName: 'Go'
        //                 }
        //             })
        //         }),  // 添加分类
        //         app.delete('/api/classification/1', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: "删除成功"
        //                 },
        //                 data: {}
        //             })
        //         }),  // 删除分类
        //
        //         // 其他
        //         app.get('/api/recommendedusers', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: "成功"
        //                 },
        //                 data: [
        //                     {
        //                         userId: 1,
        //                         userName: '张三',
        //                         userAvatar: 'https://movie.douban.com/subject/1292052/',
        //                         userViews: 3421,
        //                         userCollectionsCount: 12223
        //                     },
        //                     {
        //                         userId: 2,
        //                         userName: '李四',
        //                         userAvatar: 'https://movie.douban.com/subject/1295644/',
        //                         userViews: 3421,
        //                         userCollectionsCount: 12223
        //                     },
        //                     {
        //                         userId: 3,
        //                         userName: '王五',
        //                         userAvatar: 'https://movie.douban.com/subject/1291546/',
        //                         userViews: 3421,
        //                         userCollectionsCount: 12223
        //                     }
        //                 ]
        //             })
        //         }),  // 获取推荐的作者
        //         app.get('/api/mosttags', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         tagId: 1,
        //                         tagName: 'Python'
        //                     },
        //                     {
        //                         tagId: 2,
        //                         tagName: 'Go'
        //                     },
        //                     {
        //                         tagId: 2,
        //                         tagName: 'Java'
        //                     }
        //                     // ...
        //                 ]
        //             })
        //         }),   // 最常用的15个标签
        //         app.get('/api/tags', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         tagId: 1,
        //                         tagName: 'Python'
        //                     },
        //                     {
        //                         tagId: 2,
        //                         tagName: 'Java'
        //                     },
        //                     {
        //                         tagId: 3,
        //                         tagName: 'Go'
        //                     },
        //                 ]
        //             })
        //         }),  // 获取标签
        //         app.get('/api/searchany', (req, res) => {
        //             res.json({
        //                 status: {
        //                     code: 200,
        //                     msg: '获取成功'
        //                 },
        //                 data: [
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     },
        //                     {
        //                         blogId: 1,
        //                         blogTitle: 'Python从入门到放弃',
        //                         blogCollectionsCount: 123,
        //                         blogViews: 3455,
        //                         blogCommentsCount: 34,
        //                         blogTags: [
        //                             {
        //                                 tagId: 1,
        //                                 tagName: 'Python'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Go'
        //                             },
        //                             {
        //                                 tagId: 2,
        //                                 tagName: 'Java'
        //                             }
        //                         ],
        //                         userId: 1,
        //                         userName: 'a13912345678'
        //                     }
        //                 ]
        //             })
        //         }),  // 搜索关键字
        //     ]
        // }

        // *** 后端调试时注释掉before--结束 ***
    }
}
