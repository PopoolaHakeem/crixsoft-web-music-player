// alert('Hello! Welcome to CrixSoft Solution Web Music Player!'); 


// TITLE, ARTIST, GRAPHIC CARD ELEMENTS
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const graphicCard = document.getElementById('graphicCard');

// PROGRESS BAR ELEMENTS
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const progress = document.getElementById('progress');

// PLAYBACK CONTROL ELEMENTS
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById("audio");

// VOLUME SLIDER AND PLAYLIST ELEMENTS
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');


// SONGS ARRAY WITH TITLE, ARTIST, SOURCE AND DURATION
const songs = [{
    graphic: "./images/Oh-No.jpg",
    title: "Oh No",
    artist: "Oberz ft Fola",
    src: "./songs/Oberz - Oh No ft. FOLA.mp3",
    duration: "02:41"
  },
  {
    graphic: "./images/Rapsodi.jpg",
    title: "Eni-Duro",
    artist: "Olamide",
    src: "./songs/Olamide-Eni-Duro-OldNaijacom.mp3",
    duration: "03:12"
  },
  {
    graphic: "./images/metaverse.jpg",
    title: "Metaverse",
    artist: "Olamide",
    src: "./songs/Olamide - Metaverse.mp3",
    duration: "02:59"
  },
  {
    graphic: "./images/New-Religion.jpg",
    title: "New Religion",
    artist: "Olamide, Asake",
    src: "./songs/Olamide, Asake - New Religion.mp3",
    duration: "03:13"
  },
  {
    graphic: "./images/olamide-99.jpg",
    title: "99",
    artist: "Olamide, Seyi Vibez, Asake, Young John, Daecol",
    src: "./songs/Olamide, Seyi Vibez, Asake, Young John - 99 ft. Daecol.mp3",
    duration: "04:09"
  },
  {
    graphic: "./images/Bust-Down.jpg",
    title: "Bust Down",
    artist: "Zlatan ft Asake - Bust Down",
    src: "./songs/Zlatan ft Asake - Bust Down.mp3",
    duration: "03:16"
  },
  {
    graphic: "./images/Gimme-Your-Love.jpg",
    title: "Gimme Your Love",
    artist: "Zlatan ft Olamide - Gimme Your Love",
    src: "./songs/Zlatan ft Olamide - Gimme Your Love.mp3",
    duration: "02:52"
  },
  {
    graphic: "./images/images.jpg",
    title: "Loading",
    artist: "olamide, Asake - Loading",
    src: "./songs/Olamide - Loading ft. Bad Boy Timz - Olamide.mp3",
    duration: "03:45"
  },
  {
    graphic: "./images/Calm-Down.jpg",
    title: "Calm Down",
    artist: "Rema ft Selena Gomez",
    src: "./songs/Rema, Selena Gomez - Calm Down.mp3",
    duration: "03:59"
  }
];

//  DEFINING SONG INDEX AND PLAYBACK STATE
let currentSongIndex = 0;
let isPlaying = false;
// const audio = new Audio();

// LOAD SONG FUNCTION
function loadSong(index) {
  const song = songs[index];

  title.textContent = song.title;
  artist.textContent = song.artist;
  graphicCard.innerHTML = `
    <img src="${song.graphic}" alt="${song.title}"
    class="w-full h-full object-cover rounded-xl" />
  `;

  audio.src = song.src;

  currentSongIndex = index;

  // Save last played song
  localStorage.setItem("currentSongIndex", index);
}

// PLAY SONG FUNCTION 
function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

// PAUSE SONG FUNCTION
function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

// playBtn.addEventListener("keydown", (e) => {
//   if (e.key === " ") {
//     pauseSong();
//   } else if (e.key === " ") {
//     playSong();
//   }
// });

// PLAY/PAUSE BUTTON EVENT LISTNER
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// NEXT SONG FUNCTION
function nextSong() {
  currentSongIndex++;

  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }

  loadSong(currentSongIndex);
  playSong();
}



nextBtn.addEventListener("click", nextSong);


// PREVIOUS SONG FUNCTION
function prevSong() {
  currentSongIndex--;

  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(currentSongIndex);
  playSong();
}

prevBtn.addEventListener("click", prevSong);

// VOLUME CONTROL 
volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value;
});


// UPDATE PROGRESS BAR
audio.addEventListener("timeupdate", () => {
  const progressPercent =
    (audio.currentTime / audio.duration) * 100;

  progress.value = progressPercent || 0;

  currentTime.textContent =
    formatTime(audio.currentTime);

  duration.textContent =
    formatTime(audio.duration);

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(audio.duration);
  });

  // Save the playback position 
  audio.addEventListener("timeupdate", () => {
    localStorage.setItem("currentTime", audio.currentTime);
  });

  duration.textContent =
    formatTime(audio.duration);
});

// Restore the playback position
audio.addEventListener("loadedmetadata", () => {
  const savedTime = localStorage.getItem("currentTime");

  if (savedTime) {
    audio.currentTime = Number(savedTime);
  }
});

// SEEK THROUGH SONG
progress.addEventListener("input", () => {
  const seekTime =
    (progress.value / 100) * audio.duration;

  audio.currentTime = seekTime;
});

// FORMAT SONG IN MM:SS
function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// DISPLAY PLAYLIST
songs.forEach((song, index) => {
  const item = document.createElement("div");

  item.innerHTML = `
    <div class="flex justify-between p-3 cursor-pointer border-b border-gray-700 hover:bg-gray-800 rounded-lg transition duration-400">
      <div>
        <p class="font-semibold text-gray-100">
          ${song.title}
        </p>
        <p class="text-sm text-gray-400">
          ${song.artist}
        </p>
      </div>

      <span class="text-sm text-gray-400">
        ${song.duration}
      </span>
    </div>
  `;

  item.addEventListener("click", () => {
    currentSongIndex = index;
    loadSong(index);
    playSong();
  });

  playlistEl.appendChild(item);
});

// AUTOMATICALLY PLAY NEXT SONG WHEN CURRENT ONE ENDS
audio.addEventListener("ended", () => {
  nextSong();
});

// INITIALIZE FIRST SONG AND SET VOLUME
const savedSong = localStorage.getItem("currentSongIndex");

if (savedSong !== null) {
  currentSongIndex = Number(savedSong);
}

loadSong(currentSongIndex);

// loadSong(currentSongIndex);
// audio.volume = volumeSlider.value;


