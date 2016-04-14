window.onload = function() {

    document.getElementById("search").setAttribute("onclick", "search()");
    document.getElementById("word").setAttribute("onkeydown", "enterkey()");

};
//绑定enter键
function enterkey(){
    if(event.keyCode===13) { search();}
}

function search() {

    document.getElementById("result").innerHTML = null;

    //var txt=document.getElementById("txt").innerHTML; console.log(txt.length);
    var txt = document.getElementById("txt").value;
    console.log(txt.length);
    var word = document.getElementById("word").value;

    var tl = txt.length,
        wl = word.length;
    //记录单词的位置
    var position = [],
        start, end;

    if (wl > 0) {
        for (var i = 0; i < tl; i++) {
            start = txt.indexOf(word, i);
            end = start + wl - 1;
            if (start < 0) {
                break; } else {
                position.push([start, end]);
                i = end;
            }
        }

        console.log(position);
        console.log(position.length);
    }

    //判断是不是文本、数字字符
    function notword(x) {
        var n = (isNaN(x) && !(x.match(/^[A-Za-z\u4E00-\u9FA5]+$/)))|| (x === ' ');
        return n;
    }


    if(position.length === 0){
        document.getElementById("result").innerHTML = "提示：无此内容 输入其它文本、数字";

    }
    else {
        //记录单词所在的句子位置

        var arrtxt = txt.split('');

        var textposition = [];
        //标记位置 判断是否位于同一句子
        var aend = 0,
            astart = 0,
            preae = 0,
            preas = 0;
        for (var i = 0; i < position.length; i++) {
            for (var j = position[i][1];
                (j < arrtxt.length) && (j >= aend); j++) {
                if (notword(arrtxt[j])) {
                    aend = j - 1;
                    break;
                } else if (!notword(arrtxt[j]) && (j === arrtxt.length - 1)) {
                    aend = j;
                    break;
                }
            }
            for (var j = position[i][0];
                (j >= 0) && (j >= astart); j--) {
                if (notword(arrtxt[j])) {
                    astart = j + 1;
                    break;
                } else if (!notword(arrtxt[j]) && (j === 0)) {
                    astart = j;
                    break;
                }
            }
            //记录句子的位置
            if ((preae !== aend) && (preae !== aend)) {
                textposition.push([astart, aend]);
                preae = aend;
                prestart = astart;
            }

        }
        console.log(textposition);
        console.log(textposition.length);


        //颜色强调显示查询到的内容

        for (var i = 0; i < textposition.length; i++) {

            for (var j = textposition[i][0] + 1; j <= textposition[i][1]; j++) {

                arrtxt[textposition[i][0]] = arrtxt[textposition[i][0]] + arrtxt[j];
                arrtxt[j] = '';
            }
            arrtxt[textposition[i][0]] = "<a>" + arrtxt[textposition[i][0]] + "</a>";
            console.log(arrtxt[textposition[i][0]]);
        }

        for (var i = 0; i < arrtxt.length; i++) {
            document.getElementById("result").innerHTML += arrtxt[i];
        }


    }
}
