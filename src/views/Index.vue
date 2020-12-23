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
                <Input search v-model="key" size="large" placeholder="搜索博客 作者 标签" @on-search="search"/>
                <!--                筛选下拉框-->
                <div style="display: inline">
                </div>
                <!--                博客列表卡片-->
                <div>
                    <Card style="margin-top: 10px" v-for="(blog, index) in indexRandomBlogs"
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
                <Divider/>
                <!--                推荐作者卡片-->
                <Card>
                    <p slot="title">
                        <Icon type="ios-film-outline"></Icon>
                        推荐作者
                    </p>
                    <a href="#" slot="extra" @click.prevent="changeLimit">
                        <Icon type="ios-loop-strong"></Icon>
                        换一换
                    </a>
                    <ul>
                        <li v-for="(user, index) in recommendedUsers" :key="index" style="list-style: none">
                            <router-link :to="{name: 'BlogsOfAuthor', params:{userId: user.userId}}" style="color: red">
                                {{ user.userName }}
                            </router-link>
                            <span style="float: right">{{ user.userCollectionsCount }}收藏</span>
                        </li>
                    </ul>
                </Card>
                <Divider/>
                <!--                标签展示-->
                <Card>
                    <p slot="title">
                        <Icon type="ios-flame"/>
                        热门标签
                    </p>
                    <Tag v-for="(tag, index) in mostTags" :key="index" :color="tagColors[1]">
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
            // randomColor: function(index) {
            //     console.log(index);
            //     var index1 = index * Math.random() % this.tagColors.length;
            //     alert(index1);
            //     return this.tagColors[index1];
            // }
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
            changeLimit() {
                function getArrayItems(arr, num) {
                    const temp_array = [];
                    for (let index in arr) {
                        temp_array.push(arr[index]);
                    }
                    const return_array = [];
                    for (let i = 0; i < num; i++) {
                        if (temp_array.length > 0) {
                            const arrIndex = Math.floor(Math.random() * temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }

                this.randomRecommendedUsers = getArrayItems(this.recommendedUsers, 5);
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
            search() {
                this.$router.push({name: 'Search', query: {key: this.key}})
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
            this.changeLimit();
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
</style>