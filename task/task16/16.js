/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */

var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
var city,value;
function addAqiData() {
   city = document.getElementById("aqi-city-input").value;
    value = document.getElementById("aqi-value-input").value;
   city=city.replace(/[ ]/g,"");
   value=value.replace(/[ ]/g,"");

 // aqiData=city+" "+value;
  //console.log(aqiData);

   if(city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)&&value.match(/^\d+$/))
    { renderAqiList();}
  else if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)&&value.match(/^\d+$/))
    { alert("输入的城市名必须为中英文字符");}
  else if(!value.match(/^\d+$/)&&city.match(/^[A-Za-z\u4E00-\u9FA5]+$/))
    {alert(" 空气质量指数必须为整数");}
  else{alert("输入的城市名必须为中英文字符 空气质量指数必须为整数") ;}


  document.getElementById("aqi-city-input").value=null;
  document.getElementById("aqi-value-input").value=null;

}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var tbody=document.getElementById("aqi-table").lastChild;
  var tr=document.createElement("tr");
  var td=document.createElement("td");
  tr.appendChild(td);
  tbody.appendChild(tr);
  td.innerHTML=city;

  td=document.createElement("td");
  tr.appendChild(td);
  td.innerHTML= value ;

  td=document.createElement("td");
  tr.appendChild(td);
  td.innerHTML="<button>删除</button>";

  window.onload();
}


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() { addAqiData();}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(x) {

  var tbody=document.getElementById("aqi-table").lastChild;
  tbody.removeChild(x.parentNode.parentNode);
}

window.onload = function(){

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
 var add= document.getElementById("add-btn");
 add.setAttribute("onclick","addBtnHandle()");
 console.log(add.length);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
 var tbody=document.getElementById("aqi-table").lastChild;
 var btn=tbody.getElementsByTagName("button");


 for(var i=0;i<btn.length;i++){
  btn[i].setAttribute("onclick","delBtnHandle(this)");
 }


};

