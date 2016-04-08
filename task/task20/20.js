window.onload = function() {

    document.getElementById("search").setAttribute("onclick", "search()");

};

function search(){
    var atxt=[];
   // var mystr = "www imooc com";
   // console.log(mystr.split(" "));

    var txt=document.getElementById("txt").value; console.log(txt.length);
    var word=document.getElementById("word").value;console.log(word);
    txt[2]="B";
    console.log(txt[2]);
    console.log(txt.charAt(0));
    for(var i=0;i<txt.length;i++){

        if(isNaN(txt[i])&&!txt[i].match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
            atxt.push(" ");

        }else {atxt.push(txt[i]); }
    }
    console.log(txt.replace(/[ ]/g,""));
    document.getElementById("txt").value=atxt;
    console.log(atxt);




}

