// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  // Get the necessary elements from the DOM
  const voiceSelect = document.getElementById('voice-select');
  const talkButton = document.querySelector('button');
  const textArea = document.getElementById('text-to-speak');
  const faceImage = document.querySelector('main img');

  // Initialize SpeechSynthesis API
  const synth = window.speechSynthesis;

  // Get available voices and populate the "Select Voice" dropdown
  function populateVoices() {
    const voices = synth.getVoices();
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.textContent = `${voice.name} (${voice.lang})`;
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });
  }

  // Listen for the 'voiceschanged' event and call populateVoices
  synth.addEventListener('voiceschanged', populateVoices);

  // Function to speak the text using the selected voice
  function speakText() {
    // If statement to make sure repeated button presses don't overwrite current speaker
    if (synth.speaking) return;

    const utterance = new SpeechSynthesisUtterance(textArea.value);
    const selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    const voices = synth.getVoices();

    utterance.voice = voices.find((voice) => voice.name === selectedVoiceName);

    // Change the face image to open-mouth while speaking
    faceImage.src = 'assets/images/smiling-open.png';

    // Revert to the smiling face image when the speech ends
    utterance.onend = () => {
      faceImage.src = 'assets/images/smiling.png';
    };

    synth.speak(utterance);
  }

  // Add an event listener to the "Press to Talk" button
  talkButton.addEventListener('click', speakText);
}
