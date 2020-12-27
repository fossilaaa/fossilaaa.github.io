<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content style="margin: 1% 20% 1% 20%">
            <h2>我的收藏</h2>
            <div>
                <Card style="margin-top: 10px" v-for="(blog, index) in blogCollections" :key="index">
                    <div>
                        <h2 style="cursor: pointer":class="{title_color: ai === index}" @mouseover="ai = index" @mouseleave="ai = -1" @click="$router.push({name: 'Blog', params: {blogId: blog.blogId}})">
                            {{blog.blogTitle}}
                        </h2>
                        <Divider style="margin-top: 15px; margin-bottom: 15px"/>
                        <p class="font_color" style="font-size: 10px">
                            <Icon type="md-person"/>
                            <span style="cursor: pointer" @click="$router.push({name: 'BlogsOfAuthor', params: {authorId: blog.userId}})">{{blog.userName}}</span>
                            <Icon type="ios-eye-outline" style="margin-left: 10px"/>
                            {{blog.blogViews}}
                            <Icon type="ios-heart-outline" style="margin-left: 10px"/>
                            {{blog.blogCollectionsCount}}
                            <Icon type="ios-chatbubbles-outline" style="margin-left: 10px"/>
                            {{blog.blogCommentsCount}}
                            <Tag style="cursor: pointer" type="border" v-for="(tag, index1) in blog.blogTags"
                                 @click.native="$router.push({name: 'BlogsOfTag', params: {tagId: tag.tagId}})">
                                {{tag.tagName}}
                            </Tag>
                            <Tooltip content="点击取消收藏" placement="top" style="float: right">
                                <Button size="small" type="error" shape="circle" @click="deCollectBlog(blog.blogId)">
                                    已收藏
                                </Button>
                            </Tooltip>
                        </p>
                    </div>
                </Card>
            </div>
        </Content>
        <BackTop></BackTop>
        <Footer>
            <Foot></Foot>
        </Footer>
    </Layout>
</template>

<script>
    import Head from "../components/Header";
    import Foot from "../components/Footer";
    import {mapState} from 'vuex';

    export default {
        name: "Collections",
        data() {
            return {
                ai: -1,
                blogCollections: []
            }
        },
        computed: {
            ...mapState(['user'])
        },
        components: {
            Head,
            Foot
        },
        methods: {
            getBlogCollections() {
                this.$axios({
                    url: '/api/collections/' + this.user.userId,
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.blogCollections = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            deCollectBlog(blogId) {
                var data = new FormData();
                data.append('userId', this.user.userId);
                data.append('blogId', blogId);
                this.$axios({
                    url: '/api/collection',
                    method: 'DELETE',
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.getBlogCollections();
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            }
        },
        created() {
            this.$Loading.start();
            this.getBlogCollections();
            this.$Loading.finish();
        }
    }
</script>

<style scoped>
    .title_color {
        color: #2D8cF0;
    }
</style>