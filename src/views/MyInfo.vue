<template>
    <Layout>
        <Header>
            <Head></Head>
        </Header>
        <Content>
            <Form :model="formItem" :label-width="80">
                <input type="hidden" v-model="formItem.userId">
                <FormItem label="头像">
                    <Avatar :src="photoSrc(formItem.userAvatar)" style="width: 150px; height: 150px"/>
                        <Upload action="" :before-upload="beforeUpload">
                            <Button icon="ios-cloud-upload-outline">上传头像</Button>
                        </Upload>
                    <div v-if="avatarFile !== null"><Button type="text" @click="uploadAvatar">点击上传</Button></div>
                </FormItem>
                <FormItem label="用户名">
                    <Input v-model="formItem.userName"></Input>
                </FormItem>
                <FormItem label="手机号码">
                    <Input v-model="formItem.userPhone"></Input>
                </FormItem>
                <FormItem label="出生年月">
                    <Row>
                        <Col span="11">
                            <DatePicker type="date" v-model="formItem.userBirth"></DatePicker>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="性别">
                    <RadioGroup v-model="formItem.userGender">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="saveInfo">保存</Button>
                    <Button style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Content>
        <Footer>
            <Foot></Foot>
        </Footer>
    </Layout>
</template>
<script>
    import Head from "../components/Header";
    import Foot from "../components/Footer";
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'MyInfo',
        data() {
            return {
                avatarFile: null,
                loadingStatus: false,
                formItem: {
                    userId: 0,
                    userName: '',
                    userPhone: '',
                    userGender: "男",
                    userBirth: '',
                    userAvatar: ''
                }
            }
        },
        computed: {
            ...mapState(['user', 'userToken']),
            photoSrc() {
                return photoSrc => {
                    return `${this.$settings.HOST}${photoSrc}`;
                }
            },
        },
        components: {
            Head,
            Foot
        },
        methods: {
            ...mapActions(['changeUserInfo']),
            jsDate2JavaDate(date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            javaDate2JsDate(date) {
                return new Date(date);
            },
            getInfo() {
                this.$axios({
                    url: '/api/myinfo/' + this.user.userId,
                    method: 'GET',
                    headers: {
                        Authorization: this.userToken
                    }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.formItem.userId = res.data.data.userId;
                        this.formItem.userName = res.data.data.userName;
                        this.formItem.userPhone = res.data.data.userPhone;
                        this.formItem.userGender = res.data.data.userGender;
                        this.formItem.userBirth = this.javaDate2JsDate(res.data.data.userBirth);
                        this.formItem.userAvatar = res.data.data.userAvatar;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            beforeUpload(file) {
                this.avatarFile = file;
                return false;
            },
            uploadAvatar () {
                this.loadingStatus = true;
                var formData = new FormData();
                formData.append("userAvatar", this.avatarFile);
                this.$axios({
                    url: '/api/avatar/' + this.user.userId,
                    method: 'PUT',
                    data: formData,
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.$Notice.success({
                            title: "头像修改成功"
                        });
                        this.changeUserInfo({user: {userId: this.user.userId, userName: this.user.userName, userAvatar: res.data.data.userAvatar}});
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            saveInfo() {
                var data = new FormData();
                data.append('userId', this.formItem.userId);
                data.append('userName', this.formItem.userName);
                data.append('userPhone', this.formInline.userPhone);
                data.append('userGender', this.formItem.userGender);
                data.append('userBirth', this.jsDate2JavaDate(this.formItem.userBirth));
                this.$axios({
                    url: '/api/myinfo/' + this.user.userId,
                    method: 'PUT',
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.$Notice.success({
                            title: "信息修改成功"
                        });
                        this.changeUserInfo({user: {userId: this.user.userId, userName: this.fromItem.userName, userAvatar: this.user.userAvatar}});
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            }
        },
        created() {
            this.getInfo();
        }
    }
</script>
