$(function () {
    // 点击切换登陆和注册页面
    $("#form_reg").hide();
    $(".toReg").on('click', function () {
        $("#form_reg").show();
        $("#form_login").hide();
    });
    $(".toLogin").on('click', function () {
        $("#form_reg").hide();
        $("#form_login").show();
    });
    // 从layui中获取form对象
    var form = layui.form;
    // 从layui中获取layer对象
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            if (value !== $("#form_reg [name=pwd]").val()) {
                return '两次密码输入不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $("#form_reg").on('submit', function (e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=pwd]").val()
        }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            // 注册成功自动到登陆页面
            layer.msg(res.message);
            $(".toLogin").click();

        })
    });

    // 监听登陆表单的提交事件
    $("#form_login").on('submit', function (e) {
        e.preventDefault();
        $.post("/api/login", {
            username: $("#form_login [name=username]").val(),
            password: $("#form_login [name=pwd]").val()
        }, function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
            location.href = "index.html";
        })
    })
})