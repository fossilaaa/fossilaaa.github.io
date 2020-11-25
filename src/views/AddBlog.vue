<template>
    <Layout>
        <Header>

        </Header>
        <Content>
            <button @click="uploadImgs">保存图片</button><button @click="modal = true">写完</button>
            <mavon-editor ref="md" @imgAdd="addImg" @imgDel="delImg" @save="saveBlog" style="z-index: 0"></mavon-editor>
        </Content>
        <Modal
                v-model="modal"
                title="选择博客属性"
                @on-ok="uploadBlog"
        style="z-index: 1">
            <p>确定发表？</p>
        </Modal>
    </Layout>
</template>

<script>
    export default {
        name: "AddBlog",
        data() {
            return {
                // md编辑器属性
                mdContent: '', // markdown格式内容，纯文本
                htmlContent: '', // html格式内容，纯文本
                imgFiles: {},  // imgFiles是一个{位置: 图片文件}格式的字典

                // 博客信息选择对话框
                modal: false,
                loading: true
            }
        },
        methods: {
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
                for (var img in this.imgFiles) {
                    imgData.append(img, this.imgFiles[img]);
                }
                this.$axios({
                    url: 'api/v1/blogimages',
                    method: 'POST',
                    data: imgData,
                    headers: {'Content-Type': 'multipart/form-data'},
                }).then(res => {
                    /**
                     * 例如：返回数据为 res = [[pos, url], [pos, url]...]
                     * [
                     *      [1, url],
                     *      [2, url]
                     *  ]
                     * pos 为原图片标志（0）
                     * url 为上传后图片的url地址
                     */
                    this.$refs.md.$imglst2Url(res.data.data);
                })
            },
            // 整体保存时，全部上传
            saveBlog() {
                // 再生成纯文本信息保存
                this.mdContent = this.$refs.md.d_value;
                this.htmlContent = this.$refs.md.d_render;
                if (this.mdContent.length === 0) {
                    alert("请填写")
                    return;
                }
                this.$axios({
                    url: '/api/v1/blog',
                    method: 'POST',
                    data: JSON.stringify({'mdContent': this.mdContent, 'htmlContent': this.htmlContent}),
                }).then(res => {
                    if (res.data.status.code === 200){
                        this.$Message.success("保存成功");
                    }else{
                        alert(res.data.status.msg);
                    }
                }).catch(error=>{
                    alert(error);
                })
            },
            chooseBlogAttr(){
                this.modal = true;
            },
            uploadBlog(){

            }
        },
        beforeRouteLeave(to, from, next) {
            if (this.mdContent.length !== 0) {
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