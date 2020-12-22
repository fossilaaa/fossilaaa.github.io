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
        name: "BlogsOfAuthor",
        data() {
            return {
                authorId: 0,
                blogs: []
            }
        },
        computed: {},
        components: {
            Head,
            Foot
        },
        methods: {
            getAuthorId() {
                this.authorId = this.$route.params.authorId;
            },
            getBlogsOfAuthor() {
                this.$axios({
                    url: '/api/blogsofauthor/' + this.authorId,
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
            this.getAuthorId();
            this.getBlogsOfAuthor();
            this.$Loading.finish();
        }
    }
</script>

<style scoped>

</style>