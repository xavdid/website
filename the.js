$(document).ready(function(){
    $('a').draggable();
    $('img')
        .mouseenter(function(){
            var src = $(this).attr('src').replace(".png","1.png");
            $(this).attr("src",src);
        })
        .mouseleave(function(){
            var src2 = $(this).attr('src').replace("1.png",".png");
            $(this).attr("src",src2);
        });
});