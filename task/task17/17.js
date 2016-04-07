
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
};

/**
 * 渲染图表
 */
function renderChart(x) {

  var div=document.getElementById("aqi-chart-wrap");
  var ul=document.createElement("ul");
  var li,average,sum=0;
  div.appendChild(ul);

  for(var i=0;i<x.length;i++  ){sum+=x[i][1];}
   average=sum/x.length;

  for(var i=0;i<x.length;i++  ){
     li=document.createElement("li");
     ul.appendChild(li);
     li.setAttribute("title",x[i][0]+" "+x[i][1]);
     li.style.height=x[i][1];
     if(pageState.nowGraTime===0){li.style.width=10;}
     else if (pageState.nowGraTime===1){  li.style.width=20; }
     else if (pageState.nowGraTime===2){ li.style.width=50;}

    if (x[i][1]<(average-average*0.5) ){li.style.background="green";}
    else if(x[i][1]<(average-average*0.25)){ li.style.background="blue";}
    else if( x[i][1]<average) { li.style.background="brown";}
    else if(x[i][1]<(average+average*0.25)){ li.style.background="purple";}
    else if(x[i][1]<(average+average*0.5)){ li.style.background="orange";}
}
  var previous=ul.previousSibling;
  div.removeChild(previous);
}


/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化
for(var i=0;i<time.length;i++){
    if(time[i].checked&&(i!== pageState.nowGraTime )){
    pageState.nowGraTime=i;

  // 设置对应数据
  // 调用图表渲染函数
     getdaydata();
     getweekdata();
     getmonthdata();

}
}
}
/**
 * select发生变化时的处理函数
 */
function citySelectChange() {

    getdaydata();
    getweekdata();
    getmonthdata();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
var time;

function initGraTimeForm() {
var date =document.getElementById("form-gra-time");
time=document.getElementsByTagName("input");

for(var i=0;i<time.length;i++){
time[i].setAttribute("onclick","graTimeChange()");
if(time[i].checked){  pageState.nowGraTime=i;}
}
console.log(pageState.nowGraTime);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for(var i=1;i<data.length;i++){

    var city=document.createElement("option");
    select.appendChild(city);
    city.innerHTML=data[i][0];
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange

    getdaydata();
    select.setAttribute("onchange","citySelectChange()");

}

/**
 * 初始化图表需要的数据格式
 */
//function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
//}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  //initAqiChartData();
}

window.onload =function(){
 select=document.getElementById("city-select");
 citys=select.getElementsByTagName("option");
//将数据源中的数据存储到数组data中
for(var x in aqiSourceData){ //console.log(aqiSourceData[x]);
var i=0;
data.push([x,aqiSourceData[x]]);i++;
}
console.log(data);
init();
};


var data=[],daydata=[],weekdata=[],monthdata=[],select,citys;
//将数据处理成日期格式
function getdaydata(){
   for(var i=0;i<citys.length;i++){
    if(citys[i].selected){
      daydata=[];
     for(var x in data[i][1]){
     daydata.push([x,data[i][1][x]]);
   }
   if(pageState.nowGraTime===0){renderChart(daydata);}
}
}
}

//将数据处理成星期格式
function getweekdata(){
      weekdata=[];
      var weeknum=1, sum=0;
       weekdata.push(["第"+weeknum+"周",Math.round((daydata[0][1]+daydata[1][1]+daydata[2][1])/3)]);
     for(var i=3;i+7<daydata.length;i=i+7){
         sum=0;
       for(var j=0;j<7;j++){
       sum=sum + daydata[i+j][1];
       }
       weeknum++;
       weekdata.push(["第"+weeknum+"周",Math.round(sum/7)]);
     }
     sum=0;
     for(var i=daydata.length-(daydata.length-3)%7;i<daydata.length;i++){
       sum+=daydata[i][1];
     }
       weeknum++;
       weekdata.push(["第"+weeknum+"周",Math.round(sum/((daydata.length-3)%7))]);
       if(pageState.nowGraTime===1){ renderChart(weekdata);}
       console.log(weekdata);
       console.log(daydata.length);
}
//将数据处理成月份格式
function getmonthdata(){
  monthdata=[];
  var sum=daydata[0][1],num=1,nex, pre=daydata[0][0].substring(6,7);
  for(var i=1;i<daydata.length;i++){
     nex=daydata[i][0].substring(6,7);

    if(nex===pre){
      console.log(nex);
      sum+=daydata[i][1];num++;
      if(daydata.length-1===i) {monthdata.push([pre+"月",Math.round(sum/num)]); }
    }

    else{
      monthdata.push([pre+"月",Math.round(sum/num)]);
      pre=nex;
      sum=daydata[i][1];num=1;
    }
  }
  if(pageState.nowGraTime===2){renderChart(monthdata);}
}


