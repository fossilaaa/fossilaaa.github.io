<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content>
            <div>
                <Card style="width: 600px; margin-bottom: 20px;cursor: pointer" v-for="(blogCollectionNotice, index) in blogCollectionNotices"
                      :key="index">
                        <div>
                            <List item-layout="vertical">
                                <ListItem>
                                    <ListItemMeta :avatar="blogCollectionNotice.user.avatar" :title="blogCollectionNotice.user.userName"/>
                                    {{ blogCollectionNotice.blog.blogTitle }}
                                </ListItem>
                            </List>
                        </div>
                </Card>
            </div>
            <div>
                <Card style="width: 600px; margin-bottom: 20px;cursor: pointer" v-for="(blogCollectionNotice, index) in blogCollectionNotices"
                      :key="index">
                    <div>
                        <List item-layout="vertical">
                            <ListItem>
                                <ListItemMeta :avatar="blogCollectionNotice.user.avatar" :title="blogCollectionNotice.user.userName"/>
                                {{ blogCollectionNotice.blog.blogTitle }}
                            </ListItem>
                        </List>
                    </div>
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
        name: "Notice",
        data(){
            return {
                blogCollectionNotices: [
                    {
                        user: {
                            userId: 1,
                            userName: 'a13912345678',
                            userAvatar: 'http:/dfsdfsdf.jpg'
                        },
                        blog: {
                            blogId: 1,
                            blogTitle: 'Python'
                        },

                    },
                    {
                        user: {
                            userId: 1,
                            userName: 'a13912345678',
                            userAvatar: 'http:/dfsdfsdf.jpg'
                        },
                        blog: {
                            blogId: 1,
                            blogTitle: 'Python'
                        },

                    },
                    {
                        user: {
                            userId: 1,
                            userName: 'a13912345678',
                            userAvatar: 'http:/dfsdfsdf.jpg'
                        },
                        blog: {
                            blogId: 1,
                            blogTitle: 'Python'
                        },
                    }
                ],
                blogCommentNotices: [
                    {
                        user: {
                            userId: 1,
                            userName: 'a13912345678',
                            userAvatar: 'http:/dfsdfsdf.jpg'
                        },
                        blog: {
                            blogId: 1,
                            blogTitle: 'Python'
                        },
                        comment: "写得不错"

                    },
                    {
                        user: {
                            userId: 1,
                            userName: 'a13912345678',
                            userAvatar: 'http:/dfsdfsdf.jpg'
                        },
                        blog: {
                            blogId: 1,
                            blogTitle: 'Python'
                        },
                        comment: "写得不错"

                    },
                    {
                        user: {
                            userId: 1,
                            userName: 'a13912345678',
                            userAvatar: 'http:/dfsdfsdf.jpg'
                        },
                        blog: {
                            blogId: 1,
                            blogTitle: 'Python'
                        },
                        comment: "写得不错"

                    },
                ]
            }
        },
        computed:{

        },
        components:{
            Head,
            Foot
        },
        methods:{
            getNotices() {
                this.$axios({
                    url: '/api/unsawnotices/' + this.user.userId,
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.blogCommentNotices = res.data.data.blogCommentNotices;
                        this.blogCollectionNotices = res.data.data.blogCollectionNotices;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            }
        },
        created() {
            this.getNotices();
        }
    }
</script>

<style scoped>

</style>