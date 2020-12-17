$(function () {
    // 获取用户基本信息
    getUserInfo();
    // 获取用户基本信息函数
    function getUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            method: "GET",
            success: function (res) {
                // console.log(res);
                // 渲染用户头像
                renderAvator(res);
            }

        })
    }

    // 点击退出返回到登陆页面
    $("#backLogin").on('click', function () {
        location.href = "/login.html";
        localStorage.removeItem("token");
    })

    // 渲染用户头像函数
    function renderAvator(res) {
        var name = res.data.nickname || res.data.username;
        $("#textName").html("欢迎&nbsp;&nbsp;&nbsp;" + name)
        // 判断用户信息是否有头像
        if (res.user_pic == null) {
            var text = name[0];
            $(".text_avator").html(text).show();
            $(".layui-nav-img").hide();
        } else {
            $(".text_avator").hide();
            $(".layui-nav-img").show();
        }
    }
})
