<template>
    <Form :model="formItem" :label-width="80">
        <input type="hidden" v-model="formItem.userId">
        <FormItem label="头像">
            <Avatar :src="formItem.userAvatar" size="large"/>
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
                <Radio label="0">男</Radio>
                <Radio label="1">女</Radio>
            </RadioGroup>
        </FormItem>
       
        
        <FormItem>
            <Button type="primary" @click="saveInfo">保存</Button>
            <Button style="margin-left: 8px">取消</Button>
        </FormItem>
    </Form>
</template>
<script>
    import {mapState} from 'vuex'

    export default {
        name: 'MyInfo',
        data () {
            return {
                formItem: {
                    userId: 0,
                    userName: '',
                    userPhone: '',
                    userGender: 0,
                    userBirth: '',
                    userAvatar: ''
                }
            }
        },
        computed:{
            ...mapState(['userToken'])
        },
        methods:{
            getInfo(){
                this.$axios({
                    url: '/api/v1/myinfo',
                    method: 'GET',
                    // params: {
                    //     userId: localStorage.getItem(user.userId)
                    // },
                    headers:{
                        Authorization: this.userToken
                    }
                }).then(res=>{
                    if(res.data.status.code === 200){
                        this.formItem = res.data.data;
                    }
                })
            },
            saveInfo(){
                this.$axios({
                    url: '/api/v1/myinfo',
                    method: 'PUT',
                    data: this.formItem
                }).then(res=>{
                    if(res.data.status.code === 200){
                        this.formItem = res.data.data;
                        this.$Message.success("修改成功！");
                    }else{
                        alert("亲亲，信息有误哦！")
                    }
                }).catch(error=>{
                    alert(error);
                })
            }
        },
        created(){
            this.getInfo();
        }
    }
</script>
