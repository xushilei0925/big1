$(function () {
    // 为表单自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newPwd: function (value) {
            if (value == $("#oldPwd").val()) {
                return '原密码新密码不能一致';
            }
        },
        rePwd: function (value) {
            if (value !== $("#newPwd").val()) {
                return '两次密码不一致';
            }
        }
    })
    // 监听表单提交事件
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(".layui-form").serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("修改失败")
                }
                layui.layer.msg("修改成功");
                $(".layui-form")[0].reset();
            }
        })
    })
})