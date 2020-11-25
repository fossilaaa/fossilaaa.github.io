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
                <Input search v-model="value" size="large" placeholder="搜索博客 作者 标签" style="max-width: 50%"/>
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
                        <ListItem v-for="item in data" :key="item.title">
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
                            <router-link :to="{name: 'UserHome', params:{userId: user.userId}}">{{ user.userName }}</router-link>
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
                    <Tag color="default">default</Tag>
                    <Tag color="primary">primary</Tag>
                    <Tag color="success">success</Tag>
                    <Tag color="error">error</Tag>
                    <Tag color="warning">warning</Tag>
                    <Tag color="magenta">magenta</Tag>
                    <Tag color="#f00">red</Tag>
                    <Tag color="volcano">volcano</Tag>
                    <Tag color="orange">orange</Tag>
                    <Tag color="gold">gold</Tag>
                    <Tag color="yellow">yellow</Tag>
                    <Tag color="lime">lime</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    <Tag color="geekblue">geekblue</Tag>
                    <Tag color="purple">purple</Tag>
                    <Tag color="#FFA2D3">Custom Color</Tag>
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
                user: {
                    username: 'gaoi',
                    article_total: 30,
                    message_count: 10
                },
                value: '',
                tag_colors: [
                    'FFA2D3',
                    'purple',
                    'geekblue',
                    'blue',
                    'cyan',
                    'green',
                    'lime',
                    'yellow',
                    'orange',
                    'orange',
                    'gold',
                    'volcano',
                    'magenta',
                    'warning',
                    'red'
                ],
            }
        },
        computed: {
            ...mapState(['user', 'userToken'])
        },
        components: {
            Head,
            Foot
        },
        methods: {
            getRecommendedUsers() {
                this.$axios({
                    url: '/api/v1/recommendedusers',
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
                    url: '/api/v1/userblogdetailsinfo/' + JSON.parse(localStorage.getItem('user')).userId,
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
            }
        },
        created() {
            this.$Loading.start();
            this.getUserBlogDetailsInfo();
            this.getRecommendedUsers();
            this.changeLimit();
            this.$Loading.finish();
        }
    }
</script>

<style scoped>
    .demo-badge {
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
    }
</style>