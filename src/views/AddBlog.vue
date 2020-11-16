<template>
    <div>
        <mavon-editor v-model="blogContent"></mavon-editor>
    </div>
</template>

<script>
    export default {
        name: "AddBlog",
        data(){
            return {
                blogContent: ''
            }
        }
    }
</script>

<style scoped>

</style>