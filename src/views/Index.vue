<template>
    <Layout>
        <!--        顶部栏-->
        <Header>
            <Head></Head>
        </Header>
        <!--        主页主体-->
        <Layout style="margin: 1% 10% 1% 10%">
            <Content style="max-width: 70%">
                <!--                搜索框-->
                <Input search v-model="key" size="large" placeholder="搜索博客 作者 标签" @on-search="$router.push({name: 'Search', query: {key: key}})"/>
                <!--                博客列表卡片-->
                <div>
                    <Card style="margin-top: 10px" v-for="(blog, index) in indexRandomBlogs" :key="index">
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
            <!--            侧边栏-->
            <Sider hide-trigger style="margin-left: 5%; min-width: 25%">
                <!--                个人信息卡片-->
                <Card v-if="user">
                    <p slot="title">
                        <Icon type="md-book"/>
                        博客信息
                    </p>
                    <span slot="extra">
                        {{user.userName}}
                    </span>
                    <ul>
                        <li v-for="(item, index) in userBlogDetailsInfo" :key="index" style="list-style: none">
                            <span>{{item.info}}</span>
                            <span style="float: right">{{item.value}}</span>
                        </li>
                    </ul>
                </Card>
                <!--                推荐作者卡片-->
                <Card v-if="!user">
                    <p slot="title">
                        <Icon type="md-heart-outline" />
                        自我推荐
                    </p>
                    嘿！小老弟，站着干啥！快来加入我们吧！
                </Card>
                <Card style="margin-top: 30px;">
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        推荐作者
                    </p>
                    <ul>
                        <li v-for="(user, index) in recommendedUsers" :key="index" style="list-style: none">
                            <router-link :to="{name: 'BlogsOfAuthor', params:{authorId: user.userId}}" style="color: red">
                                {{ user.userName }}
                            </router-link>
                            <span></span>
                            <span style="float: right">{{ user.userCollectionsCount }}收藏</span>
                            <span style="float: right">{{ user.userViews }}阅读&nbsp;</span>
                        </li>
                    </ul>
                </Card>
                <!--                标签展示-->
                <Card style="margin-top: 30px;">
                    <p slot="title">
                        <Icon type="ios-flame"/>
                        热门标签
                    </p>
                    <Tag v-for="(tag, index) in mostTags" :key="index" :color="tagColors[index * 17 % 15]">
                        <router-link :to="{name: 'BlogsOfTag', params: {tagId: tag.tagId}}" style="color: #999999">
                            {{tag.tagName}}
                        </router-link>
                    </Tag>
                </Card>
                <BackTop></BackTop>
            </Sider>
        </Layout>
        <!--        底部栏-->
        <Footer>
            <Foot></Foot>
        </Footer>
    </Layout>
</template>

<script>
    import Head from '../components/Header';
    import Foot from '../components/Footer';

    import {mapState} from 'vuex'

    export default {
        name: "Index",
        data() {
            return {
                ai: -1,
                recommendedUsers: [],
                randomRecommendedUsers: [],
                userBlogDetailsInfo: [],
                indexRandomBlogs: [],
                key: '',
                tagColors: [
                    'FFA2D3',
                    'purple',
                    'geekblue',
                    'blue',
                    'cyan',
                    'green',
                    'lime',
                    'yellow',
                    'orange',
                    'gold',
                    'volcano',
                    'magenta',
                    'warning',
                    'red'
                ],
                mostTags: [],
            }
        },
        computed: {
            ...mapState(['user', 'userToken']),
        },
        components: {
            Head,
            Foot
        },
        methods: {
            getRecommendedUsers() {
                this.$axios({
                    url: '/api/recommendedusers',
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.recommendedUsers = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            getUserBlogDetailsInfo() {
                this.$axios({
                    url: '/api/userblogdetailsinfo/' + this.user.userId,
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.userBlogDetailsInfo = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            getMostTags() {
                this.$axios({
                    url: '/api/mosttags',
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.mostTags = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            getIndexRandomBlogs() {
                this.$axios({
                    url: '/api/randomblogs',
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.indexRandomBlogs = res.data.data;
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
            if (this.user) {
                this.getUserBlogDetailsInfo();
            }
            this.getRecommendedUsers();
            this.getMostTags();
            this.getIndexRandomBlogs();
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