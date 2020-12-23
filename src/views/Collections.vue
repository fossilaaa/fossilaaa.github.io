<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content>
            <div>
                <p>我的收藏</p>
                <Card style="width: 600px; margin-bottom: 20px;cursor: pointer" v-for="(blog, index) in blogCollections"
                      :key="index">
                    <router-link :to="{name: 'Blog', params: {blogId: blog.blogId}}">
                        <div>
                            <p style="font-size: 24px">
                                {{blog.blogTitle}}
                                <Tooltip content="点击取消收藏" placement="top">
                                    <Icon type="md-heart" color="red" @click="deCollectBlog(blog.blogId)"/>
                                </Tooltip>
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
    import {mapState} from 'vuex';

    export default {
        name: "Collections",
        data() {
            return {
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

</style>