
//showDivs(slideIndex);
//var AnnotatedData = new Array(); //myArray["abc"] = 200; myArray["xyz"] = 300;
//AnnotatedData = {"abc":200}
function plusDivs(n) {
    showDivs(slideIndex += n);
}
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var rad1 = document.getElementsByClassName("radio-inline1");
    var rad2 = document.getElementsByClassName("radio-inline2");
    var rad3 = document.getElementsByClassName("radio-inline3");
    var rad4 = document.getElementsByClassName("radio-inline4");
    if (n > x.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = x.length} ;
    if (n>=1 && n<=x.length){slideIndex = n;}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
	rad1[i].style.display = "none";
	rad2[i].style.display = "none";
	rad3[i].style.display = "none";
	rad4[i].style.display = "none";
    }
    x[slideIndex-1].style.display = "block";
    rad1[slideIndex-1].style.display = "block"; 
    rad2[slideIndex-1].style.display = "block";
    rad3[slideIndex-1].style.display = "block"; 
    rad4[slideIndex-1].style.display = "block"; 
}
function plusDivs_vis(n) {
    showDivs_vis(slideIndex_vis += n);
}
function showDivs_vis(n) {
    var i;
    var x = document.getElementsByClassName("mySlides_vis");
    var rad = document.getElementsByClassName("radio-inline");
    if (n > x.length) {slideIndex_vis = 1} 
    if (n < 1) {slideIndex_vis = x.length} ;
    if (n>=1 && n<=x.length){slideIndex_vis = n;}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
	rad[i].style.display = "none";
    }
    x[slideIndex_vis-1].style.display = "block";
    rad[slideIndex_vis-1].style.display = "block"; 
}
function markIN(name,value){
    var x = document.getElementById(name);
    //x.innerHTML = value;
    var y = x.getElementsByTagName('img');
    var z = x.getElementsByTagName('span');
    if (value=="Very_Good"){y[0].style.opacity=0.4;
    z[0].innerHTML = 3;z[0].style.color="green"
    AnnotatedData[name.replace(/_/g,' ')] = 3
    //console.log(AnnotatedData)
    }
    else if (value=="Good"){y[0].style.opacity=0.4;
    z[0].innerHTML = 2;z[0].style.color="green"
    AnnotatedData[name.replace(/_/g,' ')] = 2
    //console.log(AnnotatedData)
    }
    else if (value=="Not_Good"){y[0].style.opacity=0.4;
    z[0].innerHTML = 1;z[0].style.color="red"
    AnnotatedData[name.replace(/_/g,' ')] = 1
    //console.log(AnnotatedData)
    }
    else{y[0].style.opacity=0.4;
    z[0].innerHTML = 0;z[0].style.color="red"
    AnnotatedData[name.replace(/_/g,' ')] = 0}
    console.log(AnnotatedData)
    /*var element = document.createElement("div");
    element.innerHTML="Relevanttereeee"//.appendChild(document.createTextNode('Relevant'));
    document.getElementById('lc').appendChild(element);	*/
}


