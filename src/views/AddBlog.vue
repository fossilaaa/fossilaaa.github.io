<template>
    <Layout>
        <Content>
            <!--            <button @click="uploadImgs">保存图片</button>-->
            <button @click="saveBlog">保存</button>
            <button @click="chooseAttr">发表</button>
            <mavon-editor ref="md" @imgAdd="addImg" @imgDel="delImg" @save="saveBlog" @change="changeBlog"
                          style="z-index: 0"></mavon-editor>
        </Content>
        <Modal
                v-model="modal"
                title="选择博客属性"
                @on-ok="publishBlog"
                style="z-index: 1">
            <Form :label-width="80" :rules="ruleValidate">
                <FormItem label="标题" prop="ti   tle">
                    <Input v-model="blogTitle" placeholder="请输入博客标题" required></Input>
                </FormItem>
                <FormItem label="标签">
                    <Tag checkable v-for="(tag, index) in tags" color="primary" :key="index">{{tag.tagName}}</Tag>
                </FormItem>
                <FormItem label="分类">
                    <Col style="padding-right:10px">
                        <Select v-model="blogClassification" filterable allow-create @on-create="addClassification"
                                placeholder="输入以新建分类">
                            <Option v-for="classification in classifications" :value="classification.classificationId"
                                    :key="classification.classificationId">{{ classification.classificationName }}
                            </Option>
                        </Select>
                    </Col>
                </FormItem>
            </Form>
        </Modal>
    </Layout>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name: "AddBlog",
        data() {
            return {
                classifications: [],
                tags: [],

                // 博客信息
                blogId: 0,  // 0表示是新文章，当保存文章时，会返回一个新Id，以后再上传图片或文章时就用这个新的Id
                blogTitle: '',
                mdContent: '', // markdown格式内容，纯文本
                htmlContent: '', // html格式内容，纯文本
                blogTags: [],
                blogClassification: '',
                imgFiles: {},  // imgFiles是一个{位置: 图片文件}格式的字典

                // 博客信息选择对话框
                modal: false,
                loading: true,

                //是否已保存, 发表
                isSaved: 0,

                ruleValidate: {
                    title: [
                        {required: true, message: '博客标题不能为空', trigger: 'blur'}
                    ],
                },
            }
        },
        computed: {
            ...mapState(['user']),
            imgUrl() {
                return imgUrl => {

                    for (i = 0; i < imgUrl.length; i++) {
                        alert(imgUrl[i][1]);
                        imgUrl[i][1] = `${this.$settings.HOST}` + imgUrl[i][1]
                    }
                    return imgUrl;
                }
            },
        },
        methods: {
            getClassificationsNames() {
                this.$axios({
                    url: '/api/classificationsnames/' + this.user.userId,
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.classifications = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            getTags() {
                this.$axios({
                    url: '/api/tags',
                    method: 'GET',
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.tags = res.data.data;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            // 绑定@imgAdd event
            addImg(pos, file) {
                // 缓存图片信息
                this.imgFiles[pos] = file;
            },
            delImg(pos) {
                delete this.imgFiles[pos];
            },
            // 仅保存图片
            uploadImgs() {
                // 第一步.将图片上传到服务器.
                var imgData = new FormData();  //imgData是一个{位置: form表单格式的图片文件}格式的字典
                for (var pos in this.imgFiles) {
                    imgData.append('pos', this.imgFiles[pos]);
                }
                console.log(imgData);
                this.$axios({
                    url: '/api/blogimages',
                    method: 'POST',
                    data: imgData
                }).then(res => {
                    if (res.data.status.code === 200) {
                        /**
                         * 例如：返回数据为 res = [[pos, url], [pos, url]...]
                         * [
                         *      [1, url],
                         *      [2, url]
                         *  ]
                         * pos 为原图片标志（0）
                         * url 为上传后图片的url地址
                         */
                        this.$refs.md.$imglst2Url(res.data.data.blogPictures);
                        this.blogId = res.data.data.blogId;
                    }
                })
            },
            // 内容改变
            changeBlog() {
                this.isSaved = 0;
                this.mdContent = this.$refs.md.d_value;
                this.htmlContent = this.$refs.md.d_render;
            },
            // 整体保存时，全部上传
            async saveBlog() {
                if (this.mdContent.length === 0) {
                    alert("请填写");
                    return;
                }
                await this.uploadImgs();
                var data = new FormData();
                data.append('userId', this.user.userId);
                data.append('blogId', this.blogId);
                data.append('blogTitle', this.blogTitle);
                data.append('blogTags', this.blogTags);
                data.append('blogClassification', this.blogClassification);
                data.append('mdContent', this.mdContent);
                data.append('htmlContent', this.htmlContent);
                data.append('flag', 0);
                this.$axios({
                    url: '/api/blog',
                    method: 'POST',
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.isSaved = 1;
                        this.$Message.success("保存成功");
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            async publishBlog() {
                if (this.mdContent.length === 0) {
                    alert("请填写");
                    return;
                }
                await this.uploadImgs();
                this.$axios({
                    url: '/api/blog',
                    method: 'POST',
                    data: {
                        userId: this.user.userId,
                        blogId: this.blogId,
                        blogTitle: this.blogTitle,
                        blogTags: this.blogTags,
                        blogClassification: this.blogClassification,
                        mdContent: this.mdContent,
                        htmlContent: this.htmlContent,
                        flag: 1  // 0表示只保存，1表示发表
                    }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.isSaved = 1;
                        this.$Message.success("发表成功，即将跳回主页");
                        setTimeout(this.$router.push({name: 'Home', params: {userId: this.user.userId}}), 1000);
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            },
            chooseAttr() {
                this.getTags();
                this.getClassificationsNames();
                this.modal = true;
            },
            addClassification(classificationName) {
                var data = new FormData();
                data.append('userId', this.user.userId);
                data.append('classificationName', classificationName);
                this.$axios({
                    url: '/api/classification',
                    method: 'POST',
                    data: data,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                    }
                }).then(res => {
                    if (res.data.status.code === 200) {
                        this.classifications.push({
                            classificationId: res.data.data.classificationId,
                            classificationName: res.data.data.classificationName,
                        })
                        this.blogClassification = res.data.data.classificationId;
                    } else {
                        alert(res.data.status.msg);
                    }
                }).catch(error => {
                    alert(error);
                })
            }
        },
        beforeRouteLeave(to, from, next) {
            if (!this.isSaved && this.mdContent.length) {
                alert("不保存？你个憨憨");
                next(false);
            } else {
                next();
            }
        }
    }
</script>

<style scoped>

</style>