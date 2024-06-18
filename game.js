// Define button colours and game patterns
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

// Start the game sequence on key press
$(document).keypress(function() {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

// Function to generate next sequence
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  // Generate random colour and add to game pattern
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flash animation and play sound for the chosen colour
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Handle button clicks
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  // Check user's pattern against game pattern
  checkAnswer(userClickedPattern.length - 1);
});

// Function to play sound based on button colour
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Function to check user's answer against game pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }
  } else {
    console.log("Wrong!");
    gameOver();
  }
}

// Function to handle game over scenario
function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

// Function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}
