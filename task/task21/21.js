window.onload = function() {

    var boxs = document.getElementById("boxs"),
        result = document.getElementById("result");

};

var tags = [],
    n;
//去除空格
function  trim(str)  {  
    return str.replace(/[ ]/g, "");
}
//绑定按键 去重复
function check() {
    if (event.keyCode === 13 || event.keyCode === 32 || event.keyCode === 188 || event.keyCode === 229) {
        n = document.getElementById("input").value;
        n = trim(n);
        if (n.charAt(n.length - 1) === ',' || n.charAt(n.length - 1) === '，') { n = n.substring(0, n.length - 1); }
        if (n.charAt(0) === ',' || n.charAt(0) === '，') { n = n.substring(1, n.length); }
        if (n.length > 0) {
            for (var i = 0; i < tags.length; i++) {
                if (n === tags[i]) {
                    n = '';
                    document.getElementById("input").value = null;
                }
            }

            if (n !== '') { leftin(); }

        }
    }
}
//左侧输入
function leftin() {
    if (tags.length >= 10) { tags.pop(); }
    tags.unshift(n);
    box(boxs, tags);
    document.getElementById("input").value = null;
}
//输出结果
function box(y, x) {
    var ul = document.createElement("ul");
    y.appendChild(ul);
    for (var i = 0; i < x.length; i++) {
        var li = document.createElement("li");
        ul.appendChild(li);
        if (li.parentNode.parentNode === boxs) {
            li.setAttribute("onclick", "del(this)");
            li.style.background = "#8EC5F4";
        } else {
            li.setAttribute("onclick", "dele(this)");
            li.style.background = "#FECC8F";
        }
        li.setAttribute("onmouseover", "display(this)");
        li.setAttribute("onmouseout", "origindisplay(this)");
        li.innerHTML = x[i];
        li.style.color = "white";

    }
    var previous = ul.previousSibling;
    y.removeChild(previous);
}
//tag框删除
function del(x) {
    var li = boxs.getElementsByTagName("li");
    console.log(li.length);
    x.parentNode.removeChild(x);
    tags = [];
    for (var i = 0; i < li.length; i++) {
        tags.push(li[i].innerHTML);
    }
    box(boxs, tags);

}
//兴趣框删除
function dele(x) {
    var li = result.getElementsByTagName("li");
    x.parentNode.removeChild(x);
    interests = [];
    for (var i = 0; i < li.length; i++) {
        interests.push(li[i].innerHTML);
    }
    box(result, interests);
}

var inner, innercolor;
//鼠标经过样式
function display(x) {
    inner = x.innerHTML;
    innercolor = x.style.background;
    console.log(innercolor);
    x.innerHTML = "删除" + inner;
    x.style.background = "red";
    //if (x.parentNode.parentNode === result) {  }

}
//鼠标移开恢复样式
function origindisplay(x) {
    x.innerHTML = inner;
    x.style.background = innercolor;
}

var interests = [],
    wordindex;
//判断是不是文本、数字字符
function notword(x) {
    var n = (isNaN(x) && !(x.match(/^[A-Za-z\u4E00-\u9FA5]+$/))) || (x === ' ') || x === '\n';
    return n;
}
// 去除无效字符 获取文本标签
function out() {
    wordindex = [];
    var text = document.getElementById("text").value;
    console.log(text.length);
    //记录无效字符位置
    if (!notword(text[0])) { wordindex.push(-1); } //开头特殊处理
    for (var i = 0; i < text.length; i++) {

        if (notword(text[i])) {
            wordindex.push(i);
            console.log(text[i]);
        }
    }
    wordindex.push(text.length); //结尾特殊处理
    //获取有效文字
    for (var i = 0; i < wordindex.length; i++) {
        if (wordindex[i + 1] - wordindex[i] > 1 && !same(i)) {
            if (interests.length >= 10) { interests.pop(); }
            interests.unshift(text.substring(wordindex[i] + 1, wordindex[i + 1]));
        }
    }
    //去重复
    function same(i) {
        for (var j = 0; j < interests.length; j++) {
            if (text.substring(wordindex[i] + 1, wordindex[i + 1]) === interests[j]) {
                return true;
            }
        }
    }
    box(result, interests);
    document.getElementById("text").value = null;
    console.log(wordindex);
    console.log(interests);
}
