$(document).ready(function(){

    $("#start").click(function(){

        let tablesize,lvl;

        if($("#9").is(":checked")==true) tablesize=9;
        if($("#16").is(":checked")==true) tablesize=16;
        if($("#25").is(":checked")==true) tablesize=25;

        if($("#slow").is(":checked")==true) lvl="slow";
        if($("#normal").is(":checked")==true) lvl="normal";
        if($("#fast").is(":checked")==true) lvl="fast";
        
        localStorage.setItem("tablesize",tablesize);
        localStorage.setItem("gamespeed",lvl);

        $(location).attr('href','zmijica-igra.html');
    })

})