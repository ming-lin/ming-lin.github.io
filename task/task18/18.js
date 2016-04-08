window.onload = function() {

    document.getElementById("leftin").setAttribute("onclick", "leftin()");
    document.getElementById("rightin").setAttribute("onclick", "rightin()");
    document.getElementById("leftout").setAttribute("onclick", "leftout()");
    document.getElementById("rightout").setAttribute("onclick", "rightout()");
};
var nums = [],
    n;


function leftin() {
    n = document.getElementById("num").value;
    if (!isNaN(n)) {
        nums.unshift(n);
        box();
    }


}

function rightin() {
    n = document.getElementById("num").value;
    if (!isNaN(n)) {
        nums.push(n);

        box();
    }
}

function leftout() {
        alert(nums.shift());
        box();
}

function rightout() {
        alert(nums.pop());
        box();
}



function box() {

    var boxs = document.getElementById("boxs");
    var ul = document.createElement("ul");
    boxs.appendChild(ul);
    for (var i = 0; i < nums.length; i++) {
        var li = document.createElement("li");
        ul.appendChild(li);
        li.setAttribute("onclick", "del(this)");
        li.innerHTML = nums[i];
        li.style.color = "white";

    }
    var previous = ul.previousSibling;
    boxs.removeChild(previous);
}

function del(x) {
    var li = document.getElementsByTagName("li");
    x.parentNode.removeChild(x);
    nums = [];
    for (var i = 0; i < li.length; i++) {
        nums.push(li[i].innerHTML);
    }
    box();
}
