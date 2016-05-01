//获取元素对象函数
function g(x) {
    return document.getElementById(x);
}

//自动居中
function center(x) {
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;
    console.log(bodyW, bodyH);

    var floatW = x.offsetWidth;
    var floatH = x.offsetHeight;

    x.style.left = (bodyW - floatW) / 2 + "px";
    x.style.top = (bodyH - floatH) / 2 + "px";
}


window.onload = function() {

    var h, w;
    //打开浮动层
    g("open").onclick = function() {

        g("float").style.display = "block";
        g("cover").style.display = "block";
        //最小最大宽高
        h = Math.min(Math.max(g("height").value, 100), document.documentElement.clientHeight);
        w = Math.min(Math.max(g("width").value, 200), document.documentElement.clientWidth);

        if (h < 100 || w < 200) {
            h = 100;
            w = 200;
        }

        g("float").style.height = h + "px";
        g("float").style.width = w + "px";
        g("fh").innerHTML = "高度：" + h + "px";
        g("fw").innerHTML = "宽度：" + w + "px";
        //初始 居中
        center(g("float"));

    };
    //关闭浮动层
    g("close").onclick = g("cover").onclick = function() {
        g("float").style.display = "none";
        g("cover").style.display = "none";
    };
    //清除鼠标事件
    function mouseclear() {
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
    //右边调宽度
    g("resize-right").onmousedown = function() {

        var x = event.clientX;
        document.onmousemove = function() {

            var X = event.clientX - x;
            var max = document.documentElement.clientWidth - g("float").offsetLeft;
            var M = Math.min(max, g("float").offsetWidth + X); //最大宽度
            g("float").style.width = M + "px";
            console.log(X);
            g("fw").innerHTML = "宽度：" + g("float").offsetWidth + "px";
            x = event.clientX;

        };
        mouseclear();
    };

    //底边调高度
    g("resize-bottom").onmousedown = function() {

        var y = event.clientY;
        document.onmousemove = function() {

            var Y = event.clientY - y;
            var max = document.documentElement.clientHeight - g("float").offsetTop;
            var M = Math.min(max, g("float").offsetHeight + Y); //最大高度
            g("float").style.height = M + "px";
            console.log(Y);
            g("fh").innerHTML = "高度：" + g("float").offsetHeight + "px";
            y = event.clientY;

        };
        mouseclear();
    };


    //移动位置
    g("move").onmousedown = function() {
        //点击时距边界的坐标
        var x = event.clientX - g("float").offsetLeft;
        var y = event.clientY - g("float").offsetTop;
        document.onmousemove = function() {
            var W = document.documentElement.clientWidth;
            var H = document.documentElement.clientHeight;
            //对象的左边距和上边距
            var Y = event.clientY - y;
            var X = event.clientX - x;
            if (X >= 0 && X <= W - g("float").offsetWidth) { g("float").style.left = X + "px"; }
            if (Y >= 0 && Y <= H - g("float").offsetHeight) { g("float").style.top = Y + "px"; }
            g("fp").innerHTML = "左距：" + g("float").offsetLeft + "px" + " 上距：" + g("float").offsetTop + "px";

        };
        mouseclear();

    };

};
