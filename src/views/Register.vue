<template>
    <div>
        <div style="background-image: url('http://bimgs.plmeizi.com/images/bing/2020/OHR.DerwentIsle_ZH-CN9777894186_1920x1080.jpg'); width: 100%; height: 100%; position: fixed"></div>
        <div id="bubble_register">
            <Card>
                <div>
                    <h1>欢迎注册Bubble</h1>
                </div>
                <Divider></Divider>
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="userPhone">
                        <Input type="text" size="large" v-model="formInline.userPhone" placeholder="手机号">
                            <Icon type="md-call" slot="prefix"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="userPassword">
                        <Input type="password" size="large" password v-model="formInline.userPassword" placeholder="输入密码">
                            <Icon type="md-lock" slot="prefix"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="userRePassword">
                        <Input type="password" size="large" password v-model="formInline.userRePassword" placeholder="确认密码">
                            <Icon type="md-lock" slot="prefix"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" long size="large" @click="handleSubmit('formInline')">注册Bubble</Button>
                    </FormItem>
                    <span>已有帐号?<router-link to="/login">点击登录</router-link></span>
                </Form>
                <Divider/>
                <p style="text-align: center">注册登录即代表同意Bubble<a href="#">用户协议</a>和<a href="#">隐私协议</a></p>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                formInline: {
                    userPhone: '',
                    userPassword: '',
                    userRePassword: ''
                },
                ruleInline: {
                    userPhone: [
                        {
                            required: true,
                            message: '此项为必填项',
                            trigger: 'blur'
                        }
                    ],
                    userPassword: [
                        {
                            required: true,
                            message: '此项为必填项',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码不能少于6位',
                            trigger: 'blur'
                        }
                    ],
                    userRePassword: [
                        {
                            required: true,
                            message: '此项为必填项',
                            trigger: 'blur'
                        },
                        {
                            type: 'string',
                            min: 6,
                            message: '密码不能少于6位',
                            trigger: 'blur'
                        }
                    ]
                },
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$axios({
                            url: '/api/register',
                            method: 'POST',
                            data: {
                                userPhone: this.formInline.userPhone,
                                userPassword: this.formInline.userPassword
                            }
                        }).then(res=>{
                            if (res.data.status.code === 200){
                                this.$router.push('/login');
                            }else{
                                alert(res.data.status.msg);
                            }
                        }).catch(error=>{
                            alert(error);
                        })
                    } else {
                        this.$Message.error('亲亲，您的信息有误惹~');
                    }
                })
            }
        }
    }
</script>

<style scoped>
    #bubble_register {
        position: absolute;
        top: 45%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 400px;
    }
</style>