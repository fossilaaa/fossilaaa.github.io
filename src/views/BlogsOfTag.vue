<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content style="margin: 1% 20% 1% 20%">
            <Input search v-model="key" size="large" placeholder="搜索博客 作者 标签"
                   @on-search="$router.push({name: 'Search', query: {key: key}})"/>
            <!--            <h2>{{blogs[0].blogTags[0].tagName}} 标签下的博客</h2>-->
            <div>
                <Card style="margin-top: 10px" v-for="(blog, index) in blogs" :key="index">
                    <div>
                        <h2 style="cursor: pointer" :class="{title_color: ai === index}" @mouseover="ai = index"
                            @mouseleave="ai = -1" @click="$router.push({name: 'Blog', params: {blogId: blog.blogId}})">
                            {{blog.blogTitle}}
                        </h2>
                        <Divider style="margin-top: 15px; margin-bottom: 15px"/>
                        <p class="font_color" style="font-size: 10px">
                            <Icon type="md-person"/>
                            <span style="cursor: pointer"
                                  @click="$router.push({name: 'BlogsOfAuthor', params: {authorId: blog.userId}})">{{blog.userName}}</span>
                            <Icon type="ios-eye-outline" style="margin-left: 10px"/>
                            {{blog.blogViews}}
                            <Icon type="ios-heart-outline" style="margin-left: 10px"/>
                            {{blog.blogCollectionsCount}}
                            <Icon type="ios-chatbubbles-outline" style="margin-left: 10px"/>
                            {{blog.blogCommentsCount}}
                            <Tag style="cursor: pointer" type="border" v-for="(tag, index1) in blog.blogTags"
                                 @click.native="getBlogsOfTag(tag.tagId)" :color="tag.tagId === tagId? '#2D8cF0': null">
                                {{tag.tagName}}
                            </Tag>
                        </p>
                    </div>
                </Card>
            </div>
        </Content>
        <BackTop></BackTop>
        <Footer>
            <Foot></Foot>
        </Footer>
    </Layout>
</template>

<script>
    import Head from "../components/Header";
    import Foot from "../components/Footer";

    export default {
        name: "BlogsOfTag",
        data() {
            return {
                key: '',
                ai: -1,
                tagId: 0,
                blogs: []
            }
        },
        computed: {},
        components: {
            Head,
            Foot
        },
        methods: {
            getTagId() {
                this.tagId = this.$route.params.tagId;
            },
            getBlogsOfTag(tagId) {  //这里加参数是为了此页面点击标签，直接刷新数据
                this.$axios({
                    url: '/api/blogsoftag/' + tagId,
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
            this.getTagId();
            this.getBlogsOfTag(this.tagId);
            this.$Loading.finish();
        }
    }
</script>

<style scoped>
    .title_color {
        color: #2D8cF0;
    }
</style>