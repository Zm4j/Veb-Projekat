$(document).ready(function(){
    
    //bestscore, score, name;
    let name = localStorage.getItem("name")
    if(name==null) name="";
    let score = parseInt(localStorage.getItem("score"));
    let scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
    if(scoreboard==null){
        scoreboard=scoreboard0;
    }
    
    if(score>=0){
        scoreboard.push({name:name, score:score});
        for(let i=5;i>=1;i--){
            if(parseInt(scoreboard[i].score) <= parseInt(scoreboard[i-1].score)) break;
            let tempscore = scoreboard[i].score;
            let tempname = scoreboard[i].name;
            scoreboard[i]=scoreboard[i-1];
            scoreboard[i-1]={name:tempname,score:tempscore}
        }

        scoreboard.pop();
    }

    for(let i=0;i<5;i++){
        let row = $("<tr></tr>");
        row.append($("<td style='witdh:10px'>"+(i+1)+".</td>"))
        row.append($("<td style='width:200px'>"+scoreboard[i].name+"</td>"));
        row.append($("<td style='width:400px' class='bolder'> ---------------------------------------- </td>"))
        row.append($("<td style='width:200px'>"+scoreboard[i].score+"</td>"))
        $("#scoreboard").append(row)
    }

    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    if(score>-1) localStorage.setItem("prevscore", score);
    localStorage.setItem("score",-1);

    if(score>parseInt(localStorage.getItem("bestscore"))) localStorage.setItem("bestscore",score);

    $("#prevscore").append("<span>POSLEDNJI POKUSAJ:  "+name+" - "+localStorage.getItem("prevscore")+"</span>")
    
    $("#mainpage").click(function(){
        $(location).attr('href','zmijica-uputstvo.html');
    })

})

let scoreboard0 = [
    {
        name: "XXX",
        score: 0,
    },
    {
        name: "XXX",
        score: 0,
    },
    {
        name: "XXX",
        score: 0,
    },
    {
        name: "XXX",
        score: 0,
    },
    {
        name: "XXX",
        score: 0,
    }
]