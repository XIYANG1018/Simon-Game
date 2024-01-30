var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var start = false;

// click button 
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id"); // store the id of the clicked color 
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour); // store the color id in the array
    console.log(userClickedPattern); // print this array in the console
    checkAnswer(userClickedPattern.length-1);
})

$(".start").click(function() {
    startOver();
    $("h1").text("Level 0");
    start = true;
    setTimeout(() => {
        nextSequence();
    }, 1000);

})


function playSound(name) {
    // add audio to the selected color 
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// add animation effects to the pressed color
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);    
}


function nextSequence() {
    userClickedPattern = [];
    level = level + 1;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4); // create a random number between 0-3
    var randomChosenColour = buttonColours[randomNumber]; // use this random number as index to select the color in the color array
    gamePattern.push(randomChosenColour); // store the color in gamePattern array;
    console.log(gamePattern);

    // # is id-selector in JQuery
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // 100 is the time duration 
    playSound(randomChosenColour);

}


 function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("success");
    } else {
        console.log("wrong");
        startOver();
        $("h1").text("Game over, Click Start to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    }

    if (userClickedPattern.length == gamePattern.length) {
        setTimeout(() => {
            nextSequence();
        }, 1000);
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}














