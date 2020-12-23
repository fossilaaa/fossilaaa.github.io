<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content>
            <div>
                <Card style="width: 600px; margin-bottom: 20px;cursor: pointer" v-for="(blog, index) in blogs"
                      :key="index">
                    <router-link :to="{name: 'Blog', params: {blogId: blog.blogId}}">
                        <div>
                            <p style="font-size: 24px">
                                {{blog.blogTitle}}
                            </p>
                            <Divider style="margin-top: 15px; margin-bottom: 15px"/>
                            <p class="font_color" style="font-size: 10px">
                                <Icon type="ios-person-outline"/>
                                {{blog.userName}}
                                <Icon type="ios-eye-outline" style="margin-left: 10px"/>
                                {{blog.blogViews}}
                                <Icon type="ios-heart-outline" style="margin-left: 10px"/>
                                {{blog.blogCollectionsCount}}
                                <Icon type="ios-chatbubbles-outline" style="margin-left: 10px"/>
                                {{blog.blogCommentsCount}}
                            </p>
                        </div>
                    </router-link>
                </Card>
            </div>
        </Content>
        <Footer>
            <Foot></Foot>
        </Footer>
    </Layout>
</template>

<script>
    import Head from "../components/Header";
    import Foot from "../components/Footer";

    export default {
        name: "BlogsOfAuthor",
        data() {
            return {
                authorId: 0,
                blogs: []
            }
        },
        computed: {},
        components: {
            Head,
            Foot
        },
        methods: {
            getAuthorId() {
                this.authorId = this.$route.params.authorId;
            },
            getBlogsOfAuthor() {
                this.$axios({
                    url: '/api/blogsofauthor/' + this.authorId,
                    method: 'GET'
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.blogs = res.data.data
                    } else
                        alert(res.data.status.msg);
                }).catch(error => {
                    alert(error);
                })
            }
        },
        created() {
            this.$Loading.start();
            this.getAuthorId();
            this.getBlogsOfAuthor();
            this.$Loading.finish();
        }
    }
</script>

<style scoped>

</style>