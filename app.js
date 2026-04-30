// Questions array is loaded from questions.js file

var ques=document.getElementById("ques");
var opt1=document.getElementById("opt1");
var opt2=document.getElementById("opt2");
var opt3=document.getElementById("opt3");
var index=0;
var score=0;
var btn= document.getElementById("btn")
var min=1;
var sec=59;
var timer=document.getElementById("timer");
var progressFill=document.getElementById("progressFill");
var interval;
interval=setInterval(function(){
    timer.innerText=`${min}:${sec}`
    sec--;  
    if(sec<0){
        min--;
        sec=59;
    }   
    if(min<0){
        min=1
        sec=59;
        nextques();
     }
     if(index>questions.length-1){
        clearInterval(interval)
     }
     if(index==questions.length-1){
        timer.innerText=`0:00`
     }
    

},1000)

function resetTimer(){
    min=1;
    sec=59;
}

function updateProgress(){
    var progressPercent = (index / questions.length) * 100;
    progressFill.style.width = progressPercent + '%';
}

nextques();

function nextques(){
    resetTimer();
    updateProgress();

    var getoptions=document.getElementsByName("options")
    var selectedvalue=undefined;
    var selectedAns=undefined;
    
    for(var i=0;i<getoptions.length;i++){
        if(getoptions[i].checked){
            selectedvalue=getoptions[i].value
            selectedAns=questions[index-1][`option${selectedvalue}`]
        }
        getoptions[i].checked=false;
    }
    
    // Compare answer after loop completes
    if(selectedAns!==undefined && index > 0){
        var correctAns=questions[index-1]['correctOption']
        if(selectedAns==correctAns){
            score++
        }
    }

    btn.disabled = true;    

    if(index>questions.length-1){
        localStorage.setItem('quizScore', score);
        window.location.href = 'results.html';
    }
    else{
    ques.innerText=questions[index].question
    opt1.innerText=questions[index].option1
    opt2.innerText=questions[index].option2
    opt3.innerText=questions[index].option3
    index++
    }
}

function clicked(){
    btn.disabled = false;
}
