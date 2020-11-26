<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content>
            <div>
                <div>
                            <p style="font-size: 24px">
                                {{blogInfo.blog.blogTitle}}
                            </p>
                            <!-- <p class="font_color" style="margin-top: 10px">{{blogInfo.blog.blogSummary}}</p>
                            <Divider style="margin-top: 15px; margin-bottom: 15px"/> -->
                            <p class="font_color" style="font-size: 10px">
                                <Icon type="ios-person-outline"/>
                                {{blogInfo.user.userName}}
                                <Icon type="ios-eye-outline" style="margin-left: 10px"/>
                                {{blogInfo.blog.blogViews}}
                                <Icon type="ios-heart-outline" style="margin-left: 10px"/>
                                {{blogInfo.blog.blogCollectionsCount}}
                                <Icon type="ios-chatbubbles-outline" style="margin-left: 10px"/>
                                {{blogInfo.blog.blogCommentsCount}}
                            </p>
                        </div>
            <Card>
                <div v-html="blogInfo.blog.blogHtmlContent"></div>
            </Card>
            </div>
            <Divider/>
            <div>
                <List>
                    <ListItem v-for="(item, index) in blogComments" :key="index">
                        <ListItemMeta :avatar="item.user.userAvatar" :title="item.user.userName" :description="item.comment" />
                    </ListItem>
                </List>
            </div>
        </Content>
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
        data(){
            return {
                blogId: 0,
                blogInfo: {
                    user:{
                        userId: 0,
                        userName: '',
                        userAvatar: ''
                    },
                    blog:{
                        blogTitle: '',
                        blogHtmlContent: '<h1>出错惹~</h1>',
                        blogViews: 123,
                        blogCommentsCount: 23,
                        blogCollectionsCount: 8
                    }
                },
                blogComments: []
            }
        },
        computed:{
            ...mapState(['user'])
        },
        components:{
            Head,
            Foot
        },
        methods:{
            getBlogId(){
                this.blogId = this.$route.params.blogId;
            },
            getBlog(){
                this.$axios({
                    url: '/api/blog/' + this.blogId,
                    method: 'GET',
                }).then(res=>{
                    if (res.data.status.code === 200){
                        this.blogInfo = res.data.data;
                    }else{
                        alert(res.data.status.msg);
                    }
                }).catch(error=>{
                    alert(error);
                })
            },
            getBlogComments(){
                this.$axios({
                    url: '/api/comments/' + this.blogId,
                    method: 'GET',
                }).then(res=>{
                    if (res.data.status.code === 200) {
                        this.blogComments = res.data.data;
                    }else{
                        alert(res.data.status.msg);
                    }
                }).catch(error=>{
                    alert(error);
                })
            }
        },
        created() {
            this.getBlogId();
            this.getBlog();
            this.getBlogComments();
        }
    }
</script>

<style scoped>

</style>