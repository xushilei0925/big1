$(function() {
        // 获取用户基本信息
        getUserInfo();


        // 点击退出返回到登陆页面
        $("#backLogin").on('click', function() {
            location.href = "/login.html";
            localStorage.removeItem("token");
        })


    })
    // 获取用户基本信息函数
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        method: "GET",
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            renderAvator(res.data);
        },
        complete: function(res) {
            if (res.responseJSON.status == 1 || res.responseJSON.message == "身份认证失败！") {
                location.href = "/login.html"
            }

        }

    })
}


// 渲染用户头像函数
function renderAvator(res) {
    var name = res.nickname || res.username;
    $("#textName").html("欢迎&nbsp;&nbsp;&nbsp;" + name)
        // 判断用户信息是否有头像
    if (res.user_pic == null) {
        var text = name[0].toUpperCase();
        $(".text_avator").html(text).show();
        $(".layui-nav-img").hide();
    } else {
        $(".text_avator").hide();
        $(".layui-nav-img").attr("src", res.user_pic).show();
    }
}