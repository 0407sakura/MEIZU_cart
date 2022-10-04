

//将字符串转为对象
function convertStrToObj(str){
    if(!str){
        return {};
    }
    return JSON.parse(str);
}


//当前的商品数,选中商品数
function shopNum (){
    $(".count span:nth-child(1)").text($(".one").length);
    $(".count span:nth-child(2)").text($(".one:checked").length);
}


//优惠价和实际支付价
function shopTotal(){
    let countTotal = 0;
    $($(".one:checked")).each(function(){
        countTotal += eval($(this).parent().parent().children(".total").text());
        console.log($(this).parent().parent().children(".total").text());
    })
    $(".totalprice").text(countTotal);
}


//测试
let cookie_obj = {
    "sp1" : {
        "name" : "魅族 16s Pro",
        "num" : 9,
        "tips" : "全网通公开版 黑之秘境 8+128GB",
        "price" : 2999,
        "src" : "./img/cart-19.png"
    },
    "sp2" : {
        "name" : "PANDAER GAME START 副本晴雨伞",
        "num" : 1,
        "tips" : "GAME START",
        "price" : 209,
        "src" : "./img/cart-20.png"
    },
    "sp3" : {
       "name" : "PANDAER × XOG 白金星舟耳机",
        "num" : 19,
        "tips" : "白金星舟",
        "price" : 50,
        "src" : "img/cart-18.png"
    }
}

$.cookie("products",JSON.stringify(cookie_obj));

//测试
let phonenumber = 2132436;

class Cart{
    constructor(){
        //用户码和箭头指向
        this.mycenter();
        //初始化页面数据
        this.event();
        //其他效果
        this.other();

        this.paymoney();
    }

    event(){
        //获取存储中的商品信息
        let cookie_str = $.cookie('products') ? $.cookie('products') : '';
        //转对象
        let cookie_obj = convertStrToObj(cookie_str);
        // console.log(cookie_obj)
        //遍历对象
        jQuery.each(cookie_obj,(key) =>{
            //key : 商品ID
            //通过商品ID获取商品的具体信息
            // console.log(key);
            let good = cookie_obj[key];
            // console.log(good)
            //动态添加到页面中
            $(".m-c-footer").prev().append(`<ul class="goodInfo" data-good-id="${key}">
                <li><input type="checkbox" class="one opt"></li>
                <li><img src="${good.src}"></li>
				<li><p>${good.name}</p><p>${good.tips}</p></li>
				<li>${good.price}</li>
				<li class="num">
					<a href="javascript:;" class="minus">-</a>
					<input type="text" name="" id="" value="${good.num}" />
					<a href="javascript:;" class="plus">+</a>
				</li>
				<li class="total">${good.price * good.num}</li>
				<li><a href="javascript:;" class="delete">--</a></li>
            </ul>`);
        })

        //获取所有的-
        $('.minus').each(function(){
            $(this).click(function(){
                //后端
                //获取商品ID
                let id = $(this).parent().parent().attr('data-good-id');
                //获取cookie存储
                let cookie_str = $.cookie('products') ? $.cookie('products') : '';
                //转为对象
                let cookie_obj = convertStrToObj(cookie_str);
                if(cookie_obj[id].num > 1){
                    cookie_obj[id].num --;
                }
                //存储在cookie存储中
                $.cookie('products',JSON.stringify(cookie_obj));
                //前端
                $(this).next().val(cookie_obj[id].num);
                $(this).parent().next().text(cookie_obj[id].price * cookie_obj[id].num);
                //付款价格改变
                shopTotal();
            })
        })

        //获取所有的+
        $('.plus').click(function(){
            //后端
            //获取商品ID
            let id = $(this).parent().parent().attr('data-good-id');
            //获取cookie存储
            let cookie_str = $.cookie('products') ? $.cookie('products') : '';
            //转为对象
            let cookie_obj = convertStrToObj(cookie_str);
            cookie_obj[id].num ++;
            //存储在cookie存储中
            $.cookie('products',JSON.stringify(cookie_obj));
            //前端
            $(this).prev().val(cookie_obj[id].num);
            $(this).parent().next().text(cookie_obj[id].price * cookie_obj[id].num);
            //付款价格改变
            shopTotal();
        })

        //获取所有的数量框
        $('.num>input').blur(function(){
            //后端
            //获取商品ID
            let id = $(this).parent().parent().attr('data-good-id');
                //获取cookie存储
            let cookie_str = $.cookie('products') ? $.cookie('products') : '';
            //转为对象
            let cookie_obj = convertStrToObj(cookie_str);
                
            //获取当前数量
            let num = $(this).val();
                if(!(/^\d+$/.test(num) && num > 0)){
                    num = 1;
                }
                
            cookie_obj[id].num = num;
            //存储在cookie存储中
            $.cookie('products',JSON.stringify(cookie_obj));
            //前端
            $(this).val(cookie_obj[id].num);
            $(this).parent().next().text = cookie_obj[id].price * cookie_obj[id].num;
        })              
        //获取所有的删除
        //后端
        //获取商品ID
        //关闭弹窗，同时删除商品
        $(".editor").click(function(){
            $(this).toggleClass("finnished");
            if($(this).hasClass("finnished")){
                $(this).text("完成");
                $(".delete").html('<span class="iconfont icon-cuo"></span>');

                //弹出遮罩层
                $(".icon-cuo").click(function(){
                    let that = $(this).parent().parent().parent();
                    $(".mz-mask").css("display","block");
                    //遮罩层的效果
                    $(".icon-guanbijiantou").click(function(){
                        $(".mz-mask").css("display","none");
                    })
                    $(".success").click(function(){
                        $(".mz-mask").css("display","none");
                    })
                    $(".cancel").click(function(){
                        $(".mz-mask").css("display","none");
                        //前端
                        that.remove();
                        //当前商品数，选中数
                        shopNum();
                        //当前总价
                        shopTotal();
                    }) 

                    let id = that.attr('data-good-id');
                    //获取cookie存储
                    let cookie_str = $.cookie('products') ? $.cookie('products') : '';
                    //转为对象
                    let cookie_obj = convertStrToObj(cookie_str);
                    delete cookie_obj[id];
                    //存储在cookie存储中
                    $.cookie('products',JSON.stringify(cookie_obj));
                });
            }else{
                $(this).text("编辑");
                $(".delete").html('--');
            } 
        })    
    }


    other(){

        //显示当前的商品数，和选中数
        shopNum();
        
        //全选全不选
        $(".all").click(function(){
            if($(this).is(':checked')){
                $(".opt").prop("checked",true);
            }else{  
                $(".opt").prop("checked","");
            }
        })
        //一个不选退出全选,都选全选
        $(".one").click(function(){
            if($(".one:checked").length === $(".one").length){
                $(".all").prop("checked",true);
            }else{
                $(".all").prop("checked","");
            }
        })
      
        //免运费和结算按钮
        $(".opt").click(function(){
            shopNum();
            //当前总价
            shopTotal();
            //判断计算按钮颜色改变
            if($(".one:checked").length > 0){
                $(".free").text("已免运费");
                $(".payit").css("background-color","#F66567");
            }else{
                $(".free").text(" ");
                $(".payit").css("background-color","#DBDBDB");
            }

        })
        

        //当前的商品数,选中商品数
        function shopNum (){
            $(".count span:nth-child(1)").text($(".one").length);
            $(".count span:nth-child(2)").text($(".one:checked").length);
        }

        shopNum();



    }


    mycenter(){
        $(".user>ul>a>span").first().text(`用户${phonenumber}`)
        // 右上角用户特效的箭头
        $(".user").hover(
            function(){
                $("#personal").attr("class","iconfont icon-jiantoushang");
            },
            function(){
                $("#personal").attr("class","iconfont icon-jiantouxia");
            }
        );
    }
    
    //计算总价
    paymoney(){
        let $totalmoney = 0;

        $.each($(".one"),() =>{
            // console.log($(this).is(':checked'))
            if($(this).is(':checked')){
                $totalmoney += $(this).parent().parent().children(".totalprice");
            }
        })
        $(".totalprice").text($totalmoney);
    }
}

new Cart();