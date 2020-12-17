$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var$image = $('#image')
    // 1.2 配置选项
    constoptions = {
        // 纵横比aspectRatio: 1,// 指定预览区域
        preview: '.img-preview'
    }// 1.3 创建裁剪区域
    $image.cropper(options)
    varfile = e.target.files[0]
    varnewImgURL = URL.createObjectURL(file)
    $image.cropper('destroy')      // 销毁旧的裁剪区域  
        .attr('src', newImgURL)  // 重新设置图片路径 
        .cropper(options)        // 重新初始化裁剪区
    vardataURL = $image.cropper('getCroppedCanvas', { // 创建一个 Canvas 画布width: 100,height: 100    
    }).toDataURL('image/png')
})