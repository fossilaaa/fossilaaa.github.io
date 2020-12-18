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
    import {mapState} from 'vuex'

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
                }).then(res=>{
                    alert(res.data.data.userAvatar)
                })
            },
            saveInfo() {
                this.$axios({
                    url: '/api/myinfo/' + this.user.userId,
                    method: 'PUT',
                    data: {
                        userId: this.formItem.userId,
                        userName: this.formItem.userName,
                        userPhone: this.formItem.userPhone,
                        userGender: this.formItem.userGender,
                        userBirth: this.jsDate2JavaDate(this.formItem.userBirth),
                        userAvatar: this.formItem.userAvatar
                    }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.$Message.success("修改成功！");
                    } else {
                        alert("亲亲，信息有误哦！")
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
