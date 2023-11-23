const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const playButton = document.querySelector(".play");
const volumeSlider = document.querySelector(".volume-slider");
let audioBuffers = [];
let audioFiles = [
    "src/audio/intro-stem.mp3", // This needs to play first and only once after page load
    "src/audio/stem-1.mp3",
    "src/audio/stem-2.mp3",
    "src/audio/stem-3.mp3",
    "src/audio/stem-4.mp3"
];

// exclude "intro-stem" from shuffle
function shuffleStems() {
    for (let i = audioFiles.length - 1; i > 1; i--) {
        const j = Math.floor(Math.random() * i) + 1;
        [audioFiles[i], audioFiles[j]] = [audioFiles[j], audioFiles[i]];
    }
}
shuffleStems();

// array starting with "intro-stem"
const shuffledAudioFiles = ["src/audio/intro-stem.mp3", ...audioFiles.slice(1)];

// Audio volume control
const gainNode = audioContext.createGain();
gainNode.gain.value = volumeSlider.value;
gainNode.connect(audioContext.destination);

let currentSource = null;
let currentAudioIndex = 0;

// check if "intro-stem" has been played
let introStemPlayed = false;

// Load audio files and create audio buffers
async function loadAudioFiles() {
    for (const file of shuffledAudioFiles) {
        const response = await fetch(file);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        audioBuffers.push(audioBuffer);
    }
}

function playAudio() {
    if (currentSource) {
        currentSource.stop();
    }
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffers[currentAudioIndex];
    source.connect(gainNode);
    source.onended = () => {
        if (currentAudioIndex === 0 && !introStemPlayed) {
            introStemPlayed = true;
        }
        currentAudioIndex = (currentAudioIndex + 1) % audioBuffers.length; // Move to the next audio file

        // Skip "intro-stem" if it has been played once
        if (currentAudioIndex === 0 && introStemPlayed) {
            currentAudioIndex = 1;
        }
        
        playAudio();
    };
    // Debug
    // console.log(`Playing audio track: ${shuffledAudioFiles[currentAudioIndex]}`);

    source.start();
    currentSource = source;
}

playButton.addEventListener("click", function () {
    if (!currentSource) {
        if (audioBuffers.length === 0) {
            return;
        }
        playAudio();
        playButton.style.opacity = 0; // Make the button fade
        playButton.style.pointerEvents = "none"; // Make the button unusable
    }
});

volumeSlider.addEventListener("input", function () {
    gainNode.gain.value = volumeSlider.value;
});

// load audio files
loadAudioFiles();