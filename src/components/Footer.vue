<template>
    <div>
        <Divider/>
        <ul class="bubble_footer_ul">
            <li><Icon type="md-people"/>关于我们</li>
            <li><span><Icon type="logo-github"/></span>GitHub</li>
            <li><Icon type="ios-link"/>中国科大</li>
        </ul>
        <Divider/>
        <p class="bubble_footer_p">Copyright © 2020 USTC·IAT Bubble博客</p>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    .bubble_footer_ul {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
    }

    .bubble_footer_ul li {
        list-style: none;
        text-align: center;
        font-size: 20px;
        line-height: 10px;
        width: 10%;
        margin: 0 10px;
    }

    .bubble_footer_p {
        text-align: center;
    }
</style>