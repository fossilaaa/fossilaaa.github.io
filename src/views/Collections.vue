<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content>
            <div>
                <Card style="width: 600px; margin-bottom: 20px;cursor: pointer" v-for="(blog, index) in blogCollections"
                      :key="index">
                    <router-link :to="{name: 'Blog', params: {blogId: blog.blogId}}">
                        <div>
                            <p style="font-size: 24px">
                                {{blog.blogTitle}}
                            </p>
<!--                            <p class="font_color" style="margin-top: 10px">{{blog.blogSummary}}</p>-->
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
            }
        },
        created() {
            this.getBlogCollections();
        }
    }
</script>

<style scoped>

</style>