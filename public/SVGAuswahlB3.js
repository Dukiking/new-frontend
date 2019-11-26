var fls= [false,false,false,false];

FLSButton2.addEventListener("click", function(){
    //console.log("Juppi");// debug
    if (fls[0]) {
        document.getElementById('pathC1').style.strokeDashoffset=-30;
        fls[0]=false;
    }
    else {
        document.getElementById('pathC1').style.strokeDashoffset=0;
        fls[0]=true;
    }
});

FLSButton3.addEventListener("click", function(){
    //console.log("Juppi");// debug
    if (fls[1]) {
        document.getElementById('pathC2').style.strokeDashoffset=-30;
        fls[1]=false;
    }
    else {
        document.getElementById('pathC2').style.strokeDashoffset=0;
        fls[1]=true;
    }
});

FLSButton4.addEventListener("click", function(){
    //console.log("Juppi");// debug
    if (fls[2]) {
        document.getElementById('pathC3').style.strokeDashoffset=-30;
        fls[2]=false;
    }
    else {
        document.getElementById('pathC3').style.strokeDashoffset=0;
        fls[2]=true;
    }
});
var ColoB=0;

FLSButton5.addEventListener("click", function(){
    //console.log("Juppi");// debug
    if (fls[3]) {
        document.getElementById('pathC4').style.strokeDashoffset=-30;
        fls[3]=false;
    }
    else {
        document.getElementById('pathC4').style.strokeDashoffset=0;
        fls[3]=true;
    }
});

WGWButton1.addEventListener("click", function(){
    console.log("Juppi");// debug
    switch (ColoB) {
        case 1:
            document.getElementById('WGW01').style.fill='#244ca4';
            document.getElementById('WGWT01').style.color='#ffffff';
            document.getElementById('WGWF01').style.stroke='#ffffff';
            console.log("blue");// debug
            break;
        case 2:
            document.getElementById('WGW01').style.fill='#ffffff';
            document.getElementById('WGW01').style.stroke='#000000';
            document.getElementById('WGWT01').style.color='#000000';
            document.getElementById('WGWF01').style.stroke='#000000';
            console.log("white");// debug
            break;

        default:
            document.getElementById('WGW01').style.fill='#0bd609';
            document.getElementById('WGWT01').style.color='#ffffff';
            document.getElementById('WGWF01').style.stroke='#ffffff';
            document.getElementById('WGW01').style.stroke='none';
            console.log("green");// debug
            ColoB=0;
    }
    ColoB++;
});

var UmleitLi1=0;

WGWButton2.addEventListener("click", function(){
    console.log("judifudi");// debug
    switch (UmleitLi1) {
        case 1:
            document.getElementById('WGWT02').style.visibility='visible';
            document.getElementById('Umleitung').setAttribute('y',0);
            console.log("Dada");// debug
            break;
        case 2:
            document.getElementById('WGWButton2').style.stroke='black';
            document.getElementById('WGWT02').style.animation='blink 5s infinite'; //
            console.log("GugusDada");// debug
            break;

        default:
            document.getElementById('WGWT02').style.visibility='hidden';
            document.getElementById('WGWButton2').style.stroke='none';
            document.getElementById('WGWT02').style.animation='none';
            document.getElementById('Umleitung').setAttribute('y',300);
            console.log("Gugus");// debug
            UmleitLi1=0;
    }
    UmleitLi1++;
});

DestiList.addEventListener("click", function(){
    console.log("geändert");// debug
    var llength=DestiList.getElementsByTagName('li').length
    console.log("länge: "+llength);// debug

    switch (llength) {
        case 4:
            document.getElementById('WGWS01').setAttribute('height',200+35);
            document.getElementById('WGWF01').setAttribute('height',175+35);
            console.log("4 Lines");// debug
            break;

        default:
            document.getElementById('WGWS01').setAttribute('height',200);
            document.getElementById('WGWF01').setAttribute('height',175);
            console.log("3 Lines");// debug
    }
});



var runtime=3
var clock=setInterval(ani1,runtime*1000) // run Ani1 every 100ms
var currentSig=-1;
var nextSig=-1;

function ani1() {

    if (currentSig==-1) {
        currentSig=fls.findIndex(FirstTrue); //
    }

    document.getElementById('Kreuz').style.animation='none';
    document.getElementById('Pfeilunten').style.animation='none';
    document.getElementById('Pfeillink').style.animation='none';
    document.getElementById('Pfeilrechts').style.animation='none';

    if (currentSig==0) {
        if (fls[currentSig]==true) {
            document.getElementById('Kreuz').style.animation='pulse '+runtime+'s ease-in infinite';
            nextSig=fls.indexOf(true,currentSig+1);
        }else {
            nextSig=-1;
        }
    }
    if (currentSig==1) {
        if (fls[currentSig]==true) {
            document.getElementById('Pfeilunten').style.animation='pulse '+runtime+'s ease-in infinite';
            nextSig=fls.indexOf(true,currentSig+1);
        }else {
            nextSig=-1;
        }
    }
    if (currentSig==2) {
        if (fls[currentSig]==true) {
            document.getElementById('Pfeillink').style.animation='pulse '+runtime+'s ease-in infinite';
            nextSig=fls.indexOf(true,currentSig+1);
        }else {
            nextSig=-1;
        }
    }
    if (currentSig==3) {
        if (fls[currentSig]==true) {
            document.getElementById('Pfeilrechts').style.animation='pulse '+runtime+'s ease-in infinite';
            nextSig=fls.indexOf(true,currentSig+1);
        }else {
            nextSig=-1;
        }
    }
    currentSig=nextSig;
    console.log("Current sig on end"+currentSig);// debug
} // end of ani1

function FirstTrue (x){
    return x==true;
}
