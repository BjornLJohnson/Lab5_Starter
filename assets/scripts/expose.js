// expose.js

window.addEventListener('DOMContentLoaded', init);

var img;
var volumeIcon;
var audio;
var useConfetti = false;
var jsConfetti = new JSConfetti();

function init() {
  const volumeSlider = document.querySelector('#volume');
  volumeSlider.addEventListener('change', updateVolume);
  
  volumeIcon = document.querySelector('#volume-controls > img');
  img = document.querySelector('img');
  audio = document.querySelector('audio');

  const hornSelector = document.querySelector('#horn-select');
  hornSelector.addEventListener('change', updateHorn);

  const honkButton = document.querySelector('button');
  honkButton.addEventListener('click', honk);
}

function updateVolume(e) {
  if (e.target.value == 0){
    volumeIcon.src = "assets/icons/volume-level-0.svg";
  }
  else if(e.target.value < 33){
    volumeIcon.src = "assets/icons/volume-level-1.svg";
  }
  else if(e.target.value < 67){
    volumeIcon.src = "assets/icons/volume-level-2.svg";
  }
  else {
    volumeIcon.src = "assets/icons/volume-level-3.svg";
  }
  audio.volume = Number(e.target.value) / 100;
}

function updateHorn(e) {
  switch(e.target.value) {
    case "air-horn":
      img.src = "assets/images/air-horn.svg";
      audio.src = "assets/audio/air-horn.mp3";
      useConfetti = false;
      break
    case "car-horn":
      img.src = "assets/images/car-horn.svg";
      audio.src = "assets/audio/car-horn.mp3";
      useConfetti = false;
      break
    case "party-horn":
      img.src = "assets/images/party-horn.svg";
      audio.src = "assets/audio/party-horn.mp3";
      useConfetti = true;
      break
  }
}

function honk(e) {
  audio.play();
  if(useConfetti){
    jsConfetti.addConfetti();
  }
}