window.onload = function() {

    document.getElementById("leftin").setAttribute("onclick", "leftin()");
    document.getElementById("rightin").setAttribute("onclick", "rightin()");
    document.getElementById("leftout").setAttribute("onclick", "leftout()");
    document.getElementById("rightout").setAttribute("onclick", "rightout()");
    document.getElementById("sort").setAttribute("onclick", "sort()");
    box();
};
var nums = [56,85,30,23,168,89,127,41,19,35,119,12,64], n;


//左侧入
function leftin() {
    n = document.getElementById("num").value;
    if (!isNaN(n)&&n.length>0&&n>10&&n<100) {
        if(nums.length<60){
         nums.unshift(n);
         box();
         document.getElementById("num").value=null;
    }else {alert("最多为60个元素");}
    }
}
//右侧入
function rightin() {
    n = document.getElementById("num").value;
    if (!isNaN(n)&&n.length>0&&n>10&&n<100) {
        if(nums.length<60){
        nums.push(n);
        box();
        document.getElementById("num").value=null;
    }else{ alert("最多为60个元素"); }
    }
}
//左侧出
function leftout() {

        alert(nums.shift());
        box();

}
//右侧出
function rightout() {
        alert(nums.pop());
        box();
}


//柱状图显示
function box() {
    console.log(nums.length);
    console.log(nums);
    var li;
    var boxs = document.getElementById("boxs");
    var ul = document.createElement("ul");
    boxs.appendChild(ul);
    for (var i = 0; i < nums.length; i++) {
        if(z===i){li.style.background="purple";}
        li= document.createElement("li");
        ul.appendChild(li);
        li.setAttribute("title",nums[i]);
        li.setAttribute("onclick", "del(this)");

        li.style.height= nums[i];
        li.style.width=20;
        li.style.background="pink";

    }
    var previous = ul.previousSibling;
    boxs.removeChild(previous);
}
//删除
function del(x) {
    var li = document.getElementsByTagName("li");
    x.parentNode.removeChild(x);
    nums = [];
    for (var i = 0; i < li.length; i++) {
        nums.push(li[i].title);
    }
    box();
}
var z;
//可视化排序
function sort(){
     for(var k=0;k<nums.length;k++){nums[k]=parseInt(nums[k]); }

    /*
        for(var i=1;i<nums.length;i++){
        for(var j=0;j<nums.length-i;j++){

             if (nums[j]>nums[j+1]) {
               var exchange=nums[j];nums[j]=nums[j+1];nums[j+1]=exchange;

                box();
         }
        }
    }
    */
   var i=0,j=0,exchange;
   var t=setInterval(sortslow,200);
   function sortslow(){
    if(i<nums.length){
        if(j<nums.length-i-1){
            if(nums[j]>nums[j+1]){ z=j+1;
                exchange=nums[j];nums[j]=nums[j+1];nums[j+1]=exchange;
                box();
            }
            j++;
            return;

        }else {j=0;}
        i++;
    }
    else{ clearInterval(t);}
   }
}

