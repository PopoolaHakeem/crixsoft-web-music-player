// alert('Hello! Welcome to CrixSoft Solution Web Music Player!');


// Title & artist elements
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Progress bar elements
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress');

// Playback controls
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Volume slider & playlist element
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');


// songs array with title, artist, source, and duration
const songs = [
  {
    title: "Eni-Duro",
    artist: "Olamide",
    src: "Olamide-Eni-Duro-OldNaijacom.mp3",
    duration: "03:12"
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "./songs/song2.mp3",
    duration: "02:45"
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "./songs/song3.mp3",
    duration: "04:10"
  }
];

//  Define your songs array
let currentSongIndex = 0;
let isPlaying = false;
// const audio = new Audio();

// load song 
function loadSong(index) {
  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;

  audio.src = song.src;
}

// play song 
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

// pause song
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

// play/pause button event listener
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// next song
function nextSong() {
  currentSongIndex++;

  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  loadSong(currentSongIndex);
  playSong();
}

nextBtn.addEventListener("click", nextSong);


// previous song
function prevSong() {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

prevBtn.addEventListener("click", prevSong);

// volume control
volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
}   );

// update progress bar
audio.addEventListener("timeupdate", () => {
    const current = audio.currentTime;
    const total = audio.duration;
    const progress = (current / total) * 100;
    progressBar.style.width = `${progress}%`;
});

audio.addEventListener("timeupdate", () => {
  const progressPercent =
    (audio.currentTime / audio.duration) * 100;

  progress.value = progressPercent || 0;

  currentTime.textContent =
    formatTime(audio.currentTime);

  duration.textContent =
    formatTime(audio.duration);
});