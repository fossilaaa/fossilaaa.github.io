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
        data(){
            return {
                tagId: 0,
            }
        },
        computed:{

        },
        components:{
            Head,
            Foot
        },
        methods:{
            getTagId() {
                this.tagId = this.$route.params.tagId;
            },
        },
        created() {
            this.getTagId();
        }
    }
</script>

<style scoped>

</style>