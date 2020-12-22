<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content>

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
        name: "BlogsOfTag",
        data() {
            return {
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
            getBlogsOfTag() {
                this.$axios({
                    url: '/api/blogsoftag/' + this.tagId,
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
            this.getBlogsOfTag();
            this.$Loading.finish();
        }
    }
</script>

<style scoped>

</style>