<template>
    <Menu mode="horizontal" active-name="1">
        <span style="float: left; margin-left: 1%">
            <Avatar shape="square"
                    src="/logo.jpg"
                    size="large"
                    @click.native="$router.push('/')"/>
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
                        :src="photoSrc(user.userAvatar)"
                        size="large"/>
            </template>
            <MenuItem name="3-1" to="/home">
                <Icon type="md-home"/>
                我的主页
            </MenuItem>
            <MenuItem name="3-2" to="/collections">
                <Icon type="md-heart"/>
                收藏的文章
            </MenuItem>
            <MenuItem name="3-2" to="/notices">
                <Icon type="md-at"/>
                通知
                <Badge status="error" v-if="noticesCount"></Badge>
            </MenuItem>
            <MenuItem name="3-4" to="/myinfo">
                <Icon type="md-cog"/>
                设置
            </MenuItem>
            <MenuItem name="3-5" @click.native="logout">
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
                noticesCount: 0,
                noticeUserCount: 0 // 通知用户的次数，仅通知用户一次
            }
        },
        computed: {
            ...mapState(['user']),
            photoSrc() {
                return photoSrc => {
                    return `${this.$settings.HOST}${photoSrc}`;
                }
            },
        },
        methods: {
            ...mapActions(['changeLogout']),
            changeIfNotices() {
                this.$axios({
                    url: '/api/noticescount/' + this.user.userId,
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.noticesCount = res.data.data.noticesCount;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            logout() {
                this.changeLogout();
                this.$Notice.success({
                    title: '您已退出'
                })
                this.$router.push('/');
            },
            async noticeUser(){
                await this.changeIfNotices();
                if(this.noticesCount && (this.noticeUserCount < 1)){
                    this.$Notice.info({
                        title: '您有新通知！'
                    })
                }
                this.noticeUserCount += 1;
            }
        },
        created() {
            if (this.user) {
                this.noticeUser();
            }
        }
    }
</script>
<style scoped>
</style>