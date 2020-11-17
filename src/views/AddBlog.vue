<template>
    <Layout>
        <Header>

        </Header>
        <Content>
            <button @click="uploadImgs">保存图片</button><button @click="modal = true">写完</button>
            <mavon-editor ref="md" @imgAdd="addImg" @imgDel="delImg" @save="saveBlog"></mavon-editor>
        </Content>
        <Modal
                v-model="modal"
                title="Title"
                :loading="loading"
                @on-ok="asyncOK"
        style="position:fixed;">
            <p>After you click ok, the dialog box will close in 2 seconds.</p>
        </Modal>
    </Layout>
</template>

<script>
    export default {
        name: "AddBlog",
        data() {
            return {
                // md编辑器属性
                mdContent: '', // 内容，纯文本
                imgFiles: {},  // imgFiles是一个{位置: 图片文件}格式的字典

                // 博客信息选择对话框
                modal: false,
                loading: true
            }
        },
        methods: {
            // 获取文章
            // getBlog() {
            //     this.$axios({
            //         url: '/api/v1/blog',
            //         method: 'GET',
            //         params: {
            //             blogId: 1
            //         }
            //     }).then(response => {
            //         this.content = response.content;
            //     }).catch(error => {
            //         alert("请求失败")
            //     })
            // },
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
                if (this.mdContent.length === 0) {
                    alert("请填写")
                    return;
                }
                this.$axios({
                    url: '/api/v1/blog',
                    method: 'POST',
                    data: JSON.stringify({'markdown': this.mdContent}),
                }).then(response => {
                    if (response.data > 0) {
                        alert("成功")
                    } else {
                        alert("失败")
                    }
                })
            },
            chooseBlogAttr(){
                this.modal = true;
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