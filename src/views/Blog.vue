<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content style="margin: 1% 20% 1% 20%">
            <div>
                <Card>
                    <div>
                        <h1 style="font-size: 32px">
                            {{blogInfo.blog.blogTitle}}
                        </h1>
                        <!-- <p class="font_color" style="margin-top: 10px">{{blogInfo.blog.blogSummary}}</p>
                        <Divider style="margin-top: 15px; margin-bottom: 15px"/> -->
                        <p style="font-size: 14px">
                            <span>{{blogInfo.user.userName}}</span>
                            <span style="margin-left: 10px">阅读</span>
                            <span style="margin-left: 3px">{{blogInfo.blog.blogViews}}</span>
                            <span style="margin-left: 10px">收藏</span>
                            <span style="margin-left: 3px">{{blogInfo.blog.blogCollectionsCount}}</span>
                            <span style="margin-left: 10px">评论</span>
                            <span style="margin-left: 3px">{{blogInfo.blog.blogCommentsCount}}</span>
                        </p>
                    </div>
                    <Divider/>
                    <div v-html="blogInfo.blog.blogHtmlContent"></div>
                    <p style="margin-top: 30px; padding-bottom: 10px">
                        <Tag v-for="(tag, index) in blogInfo.blog.blogTags" style="margin-right: 10px" :key="index">
                            <RouterLink :to="{name: 'BlogsOfTag', params: {tagId: tag.tagId}}">{{tag.tagName}}
                            </RouterLink>
                        </Tag>
                        <span style="cursor: pointer; font-size: 16px; float: right; margin-right: 10px"><Icon
                                type="md-flag"/>举报</span>
                    </p>
                    <Divider/>
                    <div style="margin-left: 49%">
                        <Button style="background-color: #f5a623; color: #ffffff" size="default" shape="circle"
                                icon="md-star" @click="collectBlog"></Button>
                        <p>收藏</p>
                    </div>
                </Card>
            </div>
            <Card style="margin-top: 30px">
            <div>
                <List>
                    <ListItem v-for="(item, index) in blogComments" :key="index">
                        <ListItemMeta :avatar="photoSrc(item.user.userAvatar)" :title="item.user.userName"
                                      :description="item.comment"/>
                    </ListItem>
                </List>
            </div>
            <Divider/>

                <Input v-model="comment" type="textarea" placeholder="说点什么吧..."/>
                <Button type="primary" style="margin-top: 5px" @click="publishComment">发表评论</Button>
            </Card>
        </Content>
        <BackTop></BackTop>
        <Footer>
            <Foot></Foot>
        </Footer>
    </Layout>
</template>

<script>
    import Head from '../components/Header';
    import Foot from '../components/Footer';
    import {mapState} from 'vuex';

    export default {
        name: "Blog",
        data() {
            return {
                blogId: 0,
                blogInfo: null,
                blogComments: [],
                comment: '',
            }
        },
        computed: {
            ...mapState(['user']),
            photoSrc() {
                return photoSrc => {
                    return `${this.$settings.HOST}${photoSrc}`;
                }
            },
        },
        components: {
            Head,
            Foot
        },
        methods: {
            getBlogId() {
                this.blogId = this.$route.params.blogId;
            },
            getBlog() {
                var data = new FormData();
                // data.append('blogId', this.blogId);
                data.append('userId', this.user ? this.user.userId : 0);
                this.$axios({
                    url: '/api/blog/' + this.blogId,
                    method: 'post',
                    data: data
                    // headers: {
                    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    // }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.blogInfo = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            getBlogComments() {
                this.$axios({
                    url: '/api/comments/' + this.blogId,
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.blogComments = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            publishComment() {
                if (this.user.userId === this.blogInfo.user.userId) {
                    this.$Notice.warning({
                        title: "您不能评论自己的博客哦！"
                    });
                } else {
                    var data = new FormData();
                    data.append('blogId', this.blogId);
                    data.append('userId', this.user.userId);
                    data.append('comment', this.comment);
                    this.$axios({
                        url: '/api/comment',
                        method: 'POST',
                        data: data,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    }).then(res => {
                        if (res.data.status.code === 200) {
                            this.$Notice.success({
                                title: '发表成功'
                            });
                            this.comment = '';
                            this.getBlogComments();
                        } else {
                            alert(res.data.status.msg);
                        }
                    }).catch(error => {
                        alert(error);
                    })
                }
            },
            collectBlog() {
                var data = new FormData();
                data.append('userId', this.user.userId);
                data.append('blogId', this.blogId);
                if (this.user && (this.user.userId !== this.blogInfo.user.userId) && !this.blogInfo.blog.blogIsCollected) {
                    this.$axios({
                        url: '/api/collection',
                        method: 'POST',
                        data: data,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                        }
                    }).then(res => {
                        if (res.data.status.code === 200) {
                            this.$Notice.success({
                                title: "收藏成功"
                            });
                        } else {
                            alert(res.data.status.msg);
                        }
                    }).catch(error => {
                        alert(error);
                    })
                } else if (!this.user) {
                    this.$Notice.warning({
                        title: "需要登陆哦！"
                    });
                } else if (this.user && this.blogInfo.blog.blogIsCollected) {
                    this.$Notice.warning({
                        title: "您已收藏过这篇博客了哦！"
                    });
                } else if (this.user.userId === this.blogInfo.user.userId) {
                    this.$Notice.warning({
                        title: "您不能收藏自己的文章哦！"
                    });
                }
            }
        },
        created() {
            this.$Loading.start();
            this.getBlogId();
            this.getBlog();
            this.getBlogComments();
            this.$Loading.finish();
        }
    }
</script>

<style scoped>

</style>