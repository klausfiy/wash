$(function () {

    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    getCategoryLeftData();
    CategoryRightClick();
    getData(1);
})

function getCategoryLeftData() {
    $.ajax({
        url: '/category/queryTopCategory',
        success:function(data){
            console.log(data);
            var html = template('categoryLeftData',data);
            $('.category-left ul').append(html);
            $('.category-left ul li').first().addClass('active');
        }
    })
}
function CategoryRightClick(){
    $('.category-left ul ').on('click','li a',function(){
        var id = $(this).data('id');  
        $(this).parent().addClass('active').siblings().removeClass('active');
        getData(id);
    })
}
function getData(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        data:{
            id: id,
        },
        success: function(data){
            // console.log(data);
             var html = template('categoryRightData',data);
             $('.category-right .mui-scroll .mui-row').html('');
             if(data.rows.length != 0){
                $('.category-right .mui-scroll .mui-row').append(html);

             }else {
                $('.category-right .mui-scroll .mui-row').html('<p>没有数据</p>');
             }
         }
    })
}