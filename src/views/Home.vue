<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content>
            <Button @click="drawer = true" type="primary">打开</Button>
            <Drawer title="Basic Drawer" draggable scrollable placement="left" :closable="false" v-model="drawer">
                <collapse value="0" accordion simple>
                    <Panel v-for="(classification, index) in classifications" :key="index">
                        {{classification.class}}
                        <div slot="content" style="padding-left: 40px">
                            <List size="small">
                                <ListItem style="cursor: pointer" v-for="(blog, index) in classification.blogsInfo"
                                          :key="index">
                                    {{blog.blogTitle}}
                                </ListItem>
                            </List>
                        </div>
                    </Panel>
                </collapse>
            </Drawer>
            <div>
                <Card style="width: 600px; margin-bottom: 20px;cursor: pointer" v-for="(blog, index) in recentBlogs"
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
    import Head from '../components/Header'
    import Foot from '../components/Footer'

    import {mapState} from 'vuex';

    export default {
        name: "Home",
        data() {
            return {
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
</style>