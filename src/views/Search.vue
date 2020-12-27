<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content style="margin: 1% 20% 1% 20%">
            <Input search v-model="key" size="large" placeholder="搜索博客 作者 标签"
                   @on-search="getSearchBlogs"/>
            <div>
                <Card style="margin-top: 10px" v-for="(blog, index) in blogs" :key="index">
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

    export default {
        name: "Search",
        data() {
            return {
                ai: -1,
                key: '',
                blogs: []
            }
        },
        computed: {},
        components: {
            Head,
            Foot
        },
        methods: {
            getKey() {
                this.key = this.$route.query.key;
            },
            getSearchBlogs() {
                var data = new FormData();
                data.append('key', this.key);
                this.$axios({
                    url: '/api/searchany',
                    method: 'GET',
                    params: {
                        key: this.key
                    }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.blogs = res.data.data;
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
            this.getKey();
            this.getSearchBlogs();
            this.$Loading.finish();
        },
    }
</script>

<style scoped>
    .title_color {
        color: #2D8cF0;
    }
</style>