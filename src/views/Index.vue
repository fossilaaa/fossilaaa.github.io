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
                <Input search v-model="value" size="large" placeholder="搜索博客 作者 标签" style="max-width: 50%" @click="search"/>
                <!--                筛选下拉框-->
                <div style="display: inline">
                    <Dropdown>
                        <a href="javascript:void(0)">
                            时间
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>一周内</DropdownItem>
                            <DropdownItem>一个月内</DropdownItem>
                            <DropdownItem>一年内</DropdownItem>
                            <DropdownItem>重置</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <!--                博客列表卡片-->
                <Card style="margin-top: 20px">
                    <List item-layout="vertical">
                        <ListItem v-for="(item, index) in data" :key="index">
                            <ListItemMeta :avatar="item.avatar" :title="item.title" :description="item.description"/>
                            {{ item.content }}
                            <template slot="action">
                                <li>
                                    <Icon type="ios-star-outline"/>
                                    123
                                </li>
                                <li>
                                    <Icon type="ios-thumbs-up-outline"/>
                                    234
                                </li>
                                <li>
                                    <Icon type="ios-chatbubbles-outline"/>
                                    345
                                </li>
                            </template>
                            <template slot="extra">
                                <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large"
                                     style="width: 280px">
                            </template>
                        </ListItem>
                    </List>
                </Card>
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
                        <li v-for="(user, index) in randomRecommendedUsers" :key="index" style="list-style: none">
                            <router-link :to="{name: 'UserHome', params:{userId: user.userId}}">{{ user.userName }}
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
                    <router-link to="/"><Tag v-for="(tag, index) in mostTags" :key="index" :color="tagColors[1]">{{tag.tagName}}</Tag></router-link>
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
                data: [
                    {
                        title: 'This is title 1',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 2',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 3',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 1',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 2',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    },
                    {
                        title: 'This is title 3',
                        description: 'This is description, this is description, this is description.',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        content: 'This is the content, this is the content, this is the content, this is the content.'
                    }
                ],
                value: '',
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
                console.log(this.randomRecommendedUsers);
            },
            getMostTags() {
                this.$axios({
                    url: '/api/mosttags',
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.mostTags = res.data.data;
                    }else{
                        alert(res.data.status.msg);
                    }
                }).catch(error=>{
                    alert(error);
                })
            },
            search(){
                this.$router.push('/search');
            }
        },
        created() {
            this.$Loading.start();
            if (this.user) {
                this.getUserBlogDetailsInfo();
            }
            // this.getRecommendedUsers();
            // this.changeLimit();
            this.getMostTags();
            this.$Loading.finish();
        }
    }
</script>