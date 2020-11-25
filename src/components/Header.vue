<template>
    <Menu mode="horizontal" :theme="light" active-name="1">
        <span style="float: left; margin-left: 1%">
            <Avatar shape="square"
                    src="https://upload.jianshu.io/users/upload_avatars/25092372/04adab21-2a94-44fb-acc4-97d5450422a8?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"
                    size="large"/>
        </span>
        <MenuItem name="1" to="/login" style="float: right" v-if="!user">
            <Icon type="md-log-in"/>
            登录
        </MenuItem>
        <MenuItem name="2" to="/register" style="float: right;" v-if="!user">
            <Icon type="ios-people"/>
            注册
        </MenuItem>
        <Submenu name="3" style="float: right" v-if="user">
            <template slot="title">
                <Avatar shape="square"
                        :src="user.userAvatar"
                        size="large"/>
            </template>
            <MenuItem name="3-1" to="/home">
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
            <MenuItem name="3-4" @click.native="changeLogout">
                <Icon type="md-log-out"/>
                退出登录
            </MenuItem>
        </Submenu>
        <MenuItem name="4" to='/addblog' style="float: right">
            <Icon type="md-add"/>
            写博客
        </MenuItem>
    </Menu>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                activeIndex: '1',
            }
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            ...mapActions(['changeLogout']),
        },
    }
    ;
</script>
