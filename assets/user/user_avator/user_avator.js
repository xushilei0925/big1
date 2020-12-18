$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 点击上传文件
    $("#btnFile").on('click', function() {
            $("#file").click();
        })
        // 文件选择完成替换照片
    $("#file").on('change', function(e) {
        var f = e.target.files
        if (f.length === 0) {
            return layer.msg("请选择照片");
        }
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })


    // 点击确定修改用户的头像
    $("#btnAvatorOK").on('click', function() {
        //    1.拿到裁剪区域的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        // console.log(dataURL);

        // 2.将图片上传到服务器
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avator: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("头像上传失败")
                }
                layer.msg("更新头像成功")
                window.parent.getUserInfo();

            }
        })
    })
})