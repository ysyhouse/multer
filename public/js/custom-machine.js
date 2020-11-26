$(document).ready( ()=>{
var $data="";    

var $data1="피시맘 소형 FM S20";
var $data2="3mm이하";
var $data3="약 20L";
var $data4="380 *280 *660 mm";

var $data5="피시맘 소형 FM S20 SP";
var $data6="약 20L";
var $data7="약 1~10m";
var $data8="380 * 280 * 660 mm";

var $data9="피시맘 중형 FM AQ110";
var $data10="무선";
var $data11="2mm 이상";
var $data111="20~200L"; 
var $data112="약 1~10m"; 
var $data12="380 * 280 * 660 mm";


var $data15="피시맘 미니 FM MINI";
var $data16="3mm 이하";
var $data17="2kg";
var $data18="300 * 220 * 290 mm";



    $(".process .mam1").hover(function() {
        
        $("#fishmam .td-name").text($data1);
        $("#fishmam .td-size").text($data2);
        $("#fishmam .td-size2").text($data3);
        $("#fishmam .td-size3").text($data4);
    },function () {
        
        $("#fishmam .td-name").text($data15);
        $("#fishmam .td-size").text($data16);
        $("#fishmam .td-size2").text($data17);
        $("#fishmam .td-size3").text($data18);
    });

    $(".process .mam2").hover(function() {
        
        $("#fishmam .td-name").text($data5);
        
        $("#fishmam .spec").text($data7);
        $("#fishmam .td-size3").text($data8);
    },function () {
        
        $("#fishmam .td-name").text($data1);
        $("#fishmam .td-size").text($data2);
        $("#fishmam .td-size2").text($data3);
        $("#fishmam .td-size3").text($data4);
    });

    
    $(".process .mam3").hover(function() {
        
        $("#fishmam .td-name").text($data9);
        $("#fishmam .td-control").text($data10);
        $("#fishmam .td-size").text($data11);
        $("#fishmam .td-size2").text($data111);
        $("#fishmam .spec").text($data112);
        $("#fishmam .td-size3").text($data12);
    },function () {
        
        $("#fishmam .td-name").text($data1);
        $("#fishmam .td-size").text($data2);
        $("#fishmam .td-size2").text($data3);
        $("#fishmam .td-size3").text($data4);
    });
    

  
    
    


});