$(function() {
    // 获取form对象
    var form = layui.form;
    // 获取layer对象
    var layer = layui.layer;
    // 默认为表单赋值
    function userInfarmation() {
        $.ajax({
            url: '/my/userinfo',
            method: "GET",
            success: function(res) {
                if (res.status !== 0) {

                }
                $("#user_infarmation_username").val(res.data.username);
                $("#user_infarmation_nickname").val(res.data.nickname);
                $("#user_infarmation_email").val(res.data.email);
                $("#user_infarmation_ID").val(res.data.id);

            }
        })
    }
    userInfarmation();
    // 为表单生成校验规则
    form.verify({
        nickname: [
            /^[\S]{6,12}$/, '用户名必须6到12位，且不能出现空格'
        ]
    })

    // 点击重置还原表单
    $("#btnReset").on('click', function(e) {
        e.preventDefault();
        userInfarmation();
    })

    // 点击提交修改用户信息
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败");
                } else {
                    layer.msg("修改成功");
                    window.parent.getUserInfo();
                }




            }
        })
    })


})