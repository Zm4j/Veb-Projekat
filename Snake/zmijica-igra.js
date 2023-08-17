let xsnake=[];
let ysnake=[];
let xhead;
let yhead;
let rotation; // ugao gde gleda zmija
let timeout;
let idsuperfood;
let gamespeed1=500;
let tablesize
let score=0;
let rand="";

$(document).ready(function(){
    //localStorage
    tablesize = parseInt(localStorage.getItem("tablesize"));
    let gamespeed = localStorage.getItem("gamespeed");
    let bestscore = localStorage.getItem("bestscore");
    if(bestscore==null){
        bestscore=0;
        localStorage.setItem("bestscore",0);
    }
    $("#best").append("<span>best: "+(bestscore)+"</span>")

    if(gamespeed=="slow") gamespeed1=500;
    if(gamespeed=="normal") gamespeed1=250;
    if(gamespeed=="fast") gamespeed1=100;


    for(let i=0; i<tablesize;i++){
        let red = $("<tr></tr>")
        for(let j=0;j<tablesize;j++){
            let polje = $("<td></td>").addClass((i+j)%2==0?"poljeneparno":"poljeparno").attr('id', (i*tablesize+j));
            red.append(polje)
        }
        $("#addtable").append(red)
    }

    xhead = parseInt(Math.random()*(tablesize));
    yhead = parseInt(Math.random()*(tablesize));
    rotation = parseInt(Math.random()*4)*90+"deg";


    if(rotation=="0deg") $("#"+(xhead*tablesize+yhead)).addClass("headU")
    if(rotation=="180deg") $("#"+(xhead*tablesize+yhead)).addClass("headD")
    if(rotation=="90deg") $("#"+(xhead*tablesize+yhead)).addClass("headL")
    if(rotation=="270deg") $("#"+(xhead*tablesize+yhead)).addClass("headR")

    addFood("food");

    //radi();
    radisuperhrana();
    $(function() {
        $(window).keydown(function(e) {
            var key = e.which;
            //alert(key);
            let xheadpast= xhead;
            let yheadpast= yhead;
            $("#"+(xhead*tablesize+yhead)).removeClass("headU")
            $("#"+(xhead*tablesize+yhead)).removeClass("headD")
            $("#"+(xhead*tablesize+yhead)).removeClass("headL")
            $("#"+(xhead*tablesize+yhead)).removeClass("headR")
            //alert(key)
            let newrotation;
            /* up = 38, down = 40, left = 37, right = 39 */ 
            if(key==87 || key==38) {newrotation="0deg"; xhead--;}
            else if(key==68 || key==39) {newrotation="90deg"; yhead++;}
            else if(key==83 || key==40) {newrotation="180deg"; xhead++;}
            else if(key==65 || key==37) {newrotation="270deg"; yhead--;}
            else {
                clearTimeout(timeout);
                if(rotation=="0deg") $("#"+(xhead*tablesize+yhead)).addClass("headU")
                if(rotation=="180deg") $("#"+(xhead*tablesize+yhead)).addClass("headD")
                if(rotation=="90deg") $("#"+(xhead*tablesize+yhead)).addClass("headR")
                if(rotation=="270deg") $("#"+(xhead*tablesize+yhead)).addClass("headL")

                return;}
            rotation=newrotation

            obrada(xheadpast,yheadpast);

            clearTimeout(timeout);
            radi();
        });
    });

})

function radi(){
    timeout=setTimeout(function(){
        let xheadpast= xhead;
        let yheadpast= yhead;

        $("#"+(xhead*tablesize+yhead)).removeClass("headU")
        $("#"+(xhead*tablesize+yhead)).removeClass("headD")
        $("#"+(xhead*tablesize+yhead)).removeClass("headR")
        $("#"+(xhead*tablesize+yhead)).removeClass("headL")
        //alert(rotation)
        if(rotation=="0deg")xhead--;
        if(rotation=="90deg")yhead++;
        if(rotation=="180deg")xhead++;
        if(rotation=="270deg")yhead--;

        obrada(xheadpast,yheadpast);

        radi();

    },gamespeed1);
}

function obrada(xheadpast,yheadpast){
    if(xhead>=tablesize || xhead<0 || yhead>=tablesize || yhead<0){
        theend("van granice!");
        xhead=-1;
        yhead=-1;
    }
    if($("#"+(xhead*tablesize+yhead)).hasClass("body")){
        theend("voda!");
    }
    
    if($("#"+(xhead*tablesize+yhead)).hasClass("food")){
        score++;
        xsnake.push(xheadpast);
        ysnake.push(yheadpast);
        $("#"+(xhead*tablesize+yhead)).removeClass("food")
        $("#"+(xheadpast*tablesize+yheadpast)).addClass("body"+rand);
        addFood("food");
        if(xsnake.length==tablesize*tablesize-1){
            alert("wow, svaka cast");
        }
    }
    else if($("#"+(xhead*tablesize+yhead)).hasClass("superfood")){
        score+=10;
        xsnake.push(xheadpast);
        ysnake.push(yheadpast);
        $("#"+(xhead*tablesize+yhead)).removeClass("superfood")
        $("#"+(xheadpast*tablesize+yheadpast)).addClass("body"+rand);
        if(xsnake.length==tablesize*tablesize-1){
            alert("wow, svaka cast");     
        }
    }
    else{
        
        if(xsnake.length>0){
            //rand==""?rand=1:rand=(rand+1)%7+1
            let xtail=xsnake.shift();
            let ytail=ysnake.shift();
            xsnake.push(xheadpast);
            ysnake.push(yheadpast);
            $("#"+(xtail*tablesize+ytail)).removeClass("body").removeClass("body1").removeClass("body2").removeClass("body3").removeClass("body4").removeClass("body5").removeClass("body6").removeClass("body7")
            $("#"+(xheadpast*tablesize+yheadpast)).addClass("body"+rand);
        }
    }

    if(rotation=="0deg") $("#"+(xhead*tablesize+yhead)).addClass("headU")
    if(rotation=="180deg") $("#"+(xhead*tablesize+yhead)).addClass("headD")
    if(rotation=="90deg") $("#"+(xhead*tablesize+yhead)).addClass("headR")
    if(rotation=="270deg") $("#"+(xhead*tablesize+yhead)).addClass("headL")

    $("#nowscore").remove();
    $("#now").append("<span id='nowscore'>"+(score)+"</span>")
}

function theend(str){
    let name = prompt(str);
    localStorage.setItem("name", name);
    localStorage.setItem("score", score);
    $(location).attr('href','zmijica-rezultat.html');

}

function addFood(food){
    let x,y;
    while(1){
        x = parseInt(Math.random()*(tablesize));
        y = parseInt(Math.random()*(tablesize));
        
        let flag=false;
        if(x==xhead && y==yhead) flag=true;
        for(let i=0;i<xsnake.length;i++){
            if(xsnake[i]==x && ysnake[i]==y) flag=true;
        }
        if(food=="food") if($("#"+(x*tablesize+y)).hasClass("superfood")) flag=true;
        if(food=="superfood") if($("#"+(x*tablesize+y)).hasClass("food")) flag=true;
        if(flag==true)continue;

        $("#"+(x*tablesize+y)).addClass(food)   
        if(food=="superfood")
            idsuperfood=x*tablesize+y;
        break;
    }
}

function radisuperhrana(){
    setTimeout(function(){
        addFood("superfood");
        tajmer()
    },10000)
}

function tajmer(){
    setTimeout(function(){
        $("#"+idsuperfood).removeClass("superfood");
        radisuperhrana()
    },3000)
}