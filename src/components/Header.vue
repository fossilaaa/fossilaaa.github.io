<template>
    <Menu mode="horizontal" :theme="light" active-name="1">
        <!--        <menu-item>-->
        <!--            <div style="width: 50px; height: 50px">-->
        <!--                <router-link to="/">-->
        <!--                    <Avatar shape="square" icon="ios-person" size="large" />-->
        <!--                </router-link>-->
        <!--            </div>-->
        <!--        </menu-item>-->
        <span style="float: left; margin-left: 1%">
            <Avatar shape="square"
                    src="https://upload.jianshu.io/users/upload_avatars/25092372/04adab21-2a94-44fb-acc4-97d5450422a8?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"
                    size="large"/>
        </span>
        <MenuItem name="1" style="float: right">
            <Icon type="md-log-in"/>
            登录
        </MenuItem>
        <MenuItem name="2" style="float: right;">
            <Icon type="ios-people"/>
            注册
        </MenuItem>
        <Submenu name="3" style="float: right">
            <template slot="title">
                <Avatar shape="square"
                        src="https://upload.jianshu.io/users/upload_avatars/25092372/04adab21-2a94-44fb-acc4-97d5450422a8?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"
                        size="large"/>
            </template>
            <MenuItem name="3-1">
                <Icon type="md-home"/>
                我的主页
            </MenuItem>
            <MenuItem name="3-2">
                <Icon type="md-heart"/>
                收藏的文章
            </MenuItem>
            <MenuItem name="3-3">
                <Icon type="md-cog"/>
                设置
            </MenuItem>
            <MenuItem name="3-4">
                <Icon type="md-log-out"/>
                退出登录
            </MenuItem>
        </Submenu>
        <MenuItem name="4" style="float: right">
            <Icon type="md-add"/>
            写博客
        </MenuItem>
    </Menu>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1',
            }
        },
    };
</script>
