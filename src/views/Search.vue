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
        name: "Search",
        data(){
            return {

            }
        },
        computed:{

        },
        components:{
            Head,
            Foot
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>