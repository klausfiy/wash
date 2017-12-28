$(function(){
    historyData();
    delHistoryData();
    clearHistoryData();
    query();
})
// 1.点击搜索 获取输入框内容 把数据存储在本地 json格式字符串
// 2.获取本地数据 模板引擎生成数据列表
// 3.点击删除按钮清除当前本地数据
// 4.清空记录
function historyData(){
    $('#main form .btn-search').on('click',function(){
        var key = $(this).prev().val();
        // 判断是否存在history
        if(!key) {
            return;
        }
        var historyData = localStorage.getItem('history');
        if(historyData){
            historyData = JSON.parse(historyData);
        }else{
            historyData = [];
        }
        if(historyData.indexOf(key) == -1) {
            historyData.push(key);
        }
        localStorage.setItem('history',JSON.stringify(historyData));
        $(this).prev().val('');
        query();
    })
}
// 查询数据，渲染页面
function query() {
    var historyData = localStorage.getItem('history');
    if(historyData){
        historyData = JSON.parse(historyData);
           
    }else{
        historyData = [];
    }
    if(historyData.length == 0) {
        $('.history >div.mui-clearfix .title').html('没有历史搜索记录。').next().hide();     
    }else{
        $('.history >div.mui-clearfix .title').html('搜索历史').next().show();     
    }
    historyData = historyData.reverse();
    // console.log({historyData});
    var html = template('historyDataTmp',{rows:historyData});
    $('#main .history-list ul').html(html);
}
function delHistoryData() {
    $('#main .history-list ul').on('click','.btn_delete',function(){
        var delKey = $(this).prev().html();
        var historyData = localStorage.getItem('history');
        if(historyData){
            historyData = JSON.parse(historyData);
        }else{
            historyData = [];
        }
        var index = historyData.indexOf(delKey+'');
        // console.log("index:"+index);
        historyData.splice(index,1);
        // console.log(historyData);
        localStorage.setItem('history',JSON.stringify(historyData));
        
        query();
    })


}
function clearHistoryData() {
    $('.history .empty-record').click(function(){
        localStorage.setItem('history','');        
        query();
    })
}