


class Islog{
    constructor(){
        //初始化页面数据
        this.init();
    }

    //初始化数据
    init(){
        //先获取免登录中cookie的用户名
        let cookie_log = $.cookie('logined') ? $.cookie('logined') : ''; 
        
        //从cookie中获取商品
        let cookie_num = $.cookie('products') ? $.cookie('products') : '';
        
        //检测用户名是否存在
        if(1){
            $('.h-empty-right').css('display','none');
            $('.nolog').css('display','none');
            $('.header-right').css('display','block');
            $('user-num').text(cookie_log);
            // 获取退出按钮
            $('#back').click = function(){
                cookie.remove('logined',{path : '/'});
                that.init();
            }
            
            
            //获取商品数量，判断购物车是否有商品
            if(1){
                $('.m-center').css('display','block');
                $('.noshop').css('display','none');
            }else{
                $('.noshop').css('display','block');
                $('.m-center').css('display','none');
            }     
        }else{
            $('.h-empty-right').css('display','block');
            $('.nolog').css('display','block');
            $('.header-right').css('display','none');
            $('.m-center').css('display','none');
            $('.noshop').css('display','none');
        }
    

    }
}

new Islog();