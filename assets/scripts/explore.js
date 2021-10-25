// explore.js

window.addEventListener('DOMContentLoaded', init);

var synth = window.speechSynthesis;
var voices = [];
var voiceSelect;
var inputForm;
var inputTxt;
var img;

function init() {
  voiceSelect = document.querySelector('select');
  voices = synth.getVoices();

  var speakButton = document.querySelector('button');
  speakButton.addEventListener('click', speak)

  inputTxt = document.querySelector('#text-to-speak');

  img = document.querySelector('img');

  setTimeout(populateVoiceList, 1000);
  setInterval(animateFace, 200);
}

function populateVoiceList() {
  voices = synth.getVoices();
  for(var i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
}

function speak (e) {
  e.preventDefault();

  var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(var i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
  synth.speak(utterThis);
  synth.resume();
}

function animateFace() {
  if(synth.speaking){
    img.src = "assets/images/smiling-open.png"
  }
  else {
    img.src = "assets/images/smiling.png"
  }
}