<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Layout style="margin: 1% 10% 1% 0">
            <Sider hide-trigger style="margin-left: 0; margin-right: 1%; min-width: 25%">
                <collapse value="0" accordion simple style="width: 290px">
                    <Panel v-for="(classification, index) in classifications" :key="index">
                        <span>{{classification.className}}</span>
                        <Poptip style="float: right; margin-right: 10px"
                                confirm
                                title="该分类下博客将移至默认分类中，是否删除？"
                                @on-ok="deleteClassification(classification.classId)">
                            <Icon type="md-trash" v-if="classification.className !== '默认'"/>
                        </Poptip>
                        <div slot="content" style="padding-left: 40px">
                            <List size="small">
                                <ListItem style="cursor: pointer" v-for="(blog, index1) in classification.blogsInfo"
                                          :key="index1">
                                    <span @click.naive="$router.push({name: 'Blog', params: {blogId: blog.blogId}})">{{blog.blogTitle}}</span>
                                </ListItem>
                            </List>
                        </div>
                    </Panel>
                </collapse>
            </Sider>
            <Content style="max-width: 60%">
                <div>
                    <Card style="margin-top: 10px" v-for="(blog, index) in recentBlogs" :key="index">
                        <div>
                            <h2 style="cursor: pointer" :class="{title_color: ai === index}" @mouseover="ai = index"
                                @mouseleave="ai = -1"
                                @click="$router.push({name: 'Blog', params: {blogId: blog.blogId}})">
                                {{blog.blogTitle}}
                            </h2>
                            <Divider style="margin-top: 15px; margin-bottom: 15px"/>
                            <p class="font_color" style="font-size: 10px">
                                <Icon type="md-person"/>
                                <span style="cursor: pointer"
                                      @click="$router.push({name: 'BlogsOfAuthor', params: {authorId: blog.userId}})">{{blog.userName}}</span>
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
                                <Tooltip content="删除该博客" placement="top" style="float: right; margin-right: 10px">
                                    <Button size="small" type="warning" shape="circle" @click="deleteBlog(blog.blogId)">
                                        删除
                                    </Button>
                                </Tooltip>
                            </p>
                        </div>
                    </Card>
                </div>
            </Content>
            <BackTop></BackTop>
        </Layout>
        <Footer>
            <Foot></Foot>
        </Footer>
    </Layout>
</template>

<script>
    import Head from '../components/Header'
    import Foot from '../components/Footer'

    import {mapState} from 'vuex';

    export default {
        name: "Home",
        data() {
            return {
                ai: -1,
                drawer: false,
                classifications: [],
                recentBlogs: []
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
            getClassifications() {
                this.$axios({
                    url: '/api/classifications/' + this.user.userId,
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.classifications = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            getRecentBlogs() {
                this.$axios({
                    url: '/api/recentblogs/' + this.user.userId,
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.recentBlogs = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            deleteBlog(blogId) {
                this.$axios({
                    url: '/api/blog/' + blogId,
                    method: 'DELETE',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.$Notice.success({
                            title: '删除博客成功！'
                        })
                        this.getRecentBlogs()
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            deleteClassification(classId) {

                this.$axios({
                    url: '/api/classification/' + classId,
                    method: 'DELETE',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.$Notice.success({
                            title: '删除分类成功！'
                        })
                        this.getClassifications();
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
            this.getClassifications();
            this.getRecentBlogs();
            this.$Loading.finish();
        }
    }
</script>

<style scoped>
    .font_color {
        color: #8B8989;
    }

    .title_color {
        color: #2D8cF0;
    }
</style>