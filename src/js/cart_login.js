


class Islog{
    constructor(){
        //初始化页面数据
        this.init();
    }

    //初始化数据
    init(){
        //先获取免登录中cookie的用户名
        let cookie_log = $.cookie('logined') ? $.cookie('logined') : ''; 
        let cookie_num = $.cookie('products') ? $.cookie('products') : '';
        //这是最后一次登录成功的用户名
        
        //检测用户名是否存在
        if(cookie_log){
            $('.h-empty-right').css('display','none');
            $('.nolog').css('display','none');
            $('.header-right').css('display','block');

            // 获取退出按钮
            $('#back').click = function(){
                cookie.remove('logined',{path : '/'});
                that.init();
            }
            
            
            //获取商品数量，判断购物车是否有商品
            if(cookie_num){
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