$(function () {
    // 获取用户基本信息
    getUserInfo();
})
// 获取用户基本信息函数
function getUserInfo() {
    $.ajax({
        url: "/my/userinfo",
        method: "GET",
        header: {
            Authorization: localStorage.getItem('token')
        }
    })
}