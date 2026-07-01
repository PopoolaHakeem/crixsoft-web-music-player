// alert('Hello! Welcome to CrixSoft Solution Web Music Player!'); 


// Title & artist elements
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const graphicCard = document.getElementById('graphicCard');

// Progress bar elements
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const progressBar = document.getElementById('progress');

// Playback controls
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById("audio");

// Volume slider & playlist element
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');


// songs array with title, artist, source, and duration
const songs = [
  {
    graphic: "/images/Oh-No.jpg",
    title: "Oh No",
    artist: "Oberz ft Fola",
    src: "/songs/Oberz - Oh No ft FOLA.mp3",
    duration: "04:10"
  },
  {
    graphic: "/images/Rapsodi.jpg",
    title: "Eni-Duro",
    artist: "Olamide",
    src: "/songs/Olamide-Eni-Duro-OldNaijacom.mp3",
    duration: "03:12"
  },
  {graphic: "/images/Metaverse.jpg",
    title: "Metaverse",
    artist: "Olamide",
    src: "/songs/Olamide - Metaverse.mp3",
    duration: "02:59"
  },
  {
    graphic: "/images/New-Religion.jpg",
    title: "New Religion",
    artist: "Olamide, Asake",
    src: "/songs/Olamide, Asake - New Religion.mp3",
    duration: "03:13"
  },
  {
    graphic: "/images/New-Religion.jpg",
    title: "Song 5",
    artist: "Artist Two",
    src: "/songs/song2.mp3",
    duration: "02:45"
  },
  {
    title: "Song 6",
    artist: "Artist Two",
    src: "/songs/song2.mp3",
    duration: "02:45"
  },
  {
    title: "Song 7",
    artist: "Artist Two",
    src: "/songs/song2.mp3",
    duration: "02:45"
  },
  {
    title: "Song 8",
    artist: "Artist Two",
    src: "/songs/song2.mp3",
    duration: "02:45"
  },
  {
    title: "Song 9",
    artist: "Artist Two",
    src: "/songs/song2.mp3",
    duration: "02:45"
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
  graphicCard.style.backgroundImage = `url(${song.graphic})`;
  audio.src = song.src;

  graphicCard.innerHTML = `<img src="${song.graphic}" alt="${song.title}" class="w-full h-full object-cover rounded-xl" />`;
  

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

// seek through song
progress.addEventListener("input", () => {
  const seekTime =
    (progress.value / 100) * audio.duration;

  audio.currentTime = seekTime;
});

// format time in mm:ss
function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// display playlist
songs.forEach((song, index) => {
  const item = document.createElement("div");

  item.innerHTML = `
    <div class="flex justify-between p-3 cursor-pointer border-b">
      <div>
        <p>${song.title}</p>
        <p class="text-sm text-gray-500">
          ${song.artist}
        </p>
      </div>

      <span>${song.duration}</span>
    </div>
  `;

  item.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(index);
    playSong();
  });

  playlist.appendChild(item);
});

// automatically play next song when current song ends
audio.addEventListener("ended", () => {
  nextSong();
});

// initial song load
loadSong(currentSongIndex);
audio.volume = volume.value;
