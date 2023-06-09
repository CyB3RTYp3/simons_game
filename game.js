let buttonColours=["red","blue","green","yellow"]

let gamePattern=[]
let userClickedPattern=[]

let level=0;
let started=false;

// let higscore=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){

    let userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        
        console.log("success");
        
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    }
     else{

         console.log("failure");
         $("body").addClass("game-over")
         setTimeout(()=>{
            $("body").removeClass("game-over")
         },200)
         $("#level-title").text("Game Over, Press Any Key to Restart")
         startOver();

     }
 
}

function startOver(){
   started=false;
   gamePattern=[];
   level=0;
}


function nextSequence()
{
    userClickedPattern=[];

    level++;
    $("#level-title").text("Level "+ level);

    let randomNumber=Math.floor(Math.random()*4); //creates a random number btwn 0 to 3
    let randomChosenColour =buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name){
    let audio=new Audio("sounds/"+name+".mp3")
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
         $("#"+currentColour).removeClass("pressed") 
        },100);
}

