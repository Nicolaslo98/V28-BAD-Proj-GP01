// Get the button element
let button = document.getElementById("myButton");

// Create an audio element
let audio = new Audio("sound/start.mp3");

// Add a click event listener to the button
button.addEventListener("click", function() {
  // Play the audio
  audio.play();
});