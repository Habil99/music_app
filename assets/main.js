window.onload = () => {
  const play_btn = document.getElementById("play-btn");
  const play_btn_icon = document.getElementById("play-btn-icon");
  const prev_btn = document.getElementById("prev-btn");
  const next_btn = document.getElementById("next-btn");
  const audio = document.getElementById("audio");

  const song_name = document.getElementById("music-name");
  const song_artist = document.getElementById("artist-name");
  const song_img = document.getElementById("song-img");

  const next_song_name = document.getElementById("next-music-name");
  const next_song_artist = document.getElementById("next-music-artist");
  let current_song_index;
  let next_song_index;

  const range = document.getElementById("range");
  const volume_down = document.getElementById("volume-down");
  const volume_up = document.getElementById("volume-up");
  const volume_mute = document.getElementById("volume-mute");
  const snackbar = document.getElementById("snackbar");

  let songs = [
    {
      title: "Faded",
      artist: "Alan Walker",
      song_path: "/assets/music/music1.mp3",
      img_path: "/assets/images/faded.jpg",
    },
    {
      title: "Rockabye",
      artist: "Clean Bandit ft. Sean Paul Anne-Marie",
      song_path: "/assets/music/music3.mp3",
      img_path: "/assets/images/rockabye.jpg",
    },
    {
      title: "Russian Music",
      artist: "Unkown",
      song_path: "/assets/music/music2.mp3",
      img_path: "/assets/images/Russian-music.jpg",
    },
    {
      title: "Lush Life",
      artist: "Zara Larsson",
      song_path: "/assets/music/music4.mp3",
      img_path: "/assets/images/zara-larsson.jpg",
    },
  ];

  InitPlayer();
  play_btn.addEventListener("click", TogglePlaySong);
  next_btn.addEventListener("click", () => ChangeSong());
  prev_btn.addEventListener("click", () => ChangeSong(false));

  function InitPlayer() {
    current_song_index = 0;
    next_song_index = current_song_index + 1;
    UpdatePlayer();
  }

  function TogglePlaySong() {
    play_btn.classList.toggle("active");
    if (audio.paused) {
      audio.play();
      play_btn_icon.classList.remove("fa-play");
      play_btn_icon.classList.add("fa-pause");
    } else {
      audio.pause();
      play_btn_icon.classList.add("fa-play");
      play_btn_icon.classList.remove("fa-pause");
    }
  }

  function UpdatePlayer() {
    let song = songs[current_song_index];

    song_artist.innerText = `${song.artist}`;
    song_name.innerText = `${song.title}`;
    song_img.src = `${song.img_path}`;
    next_song_name.innerText = `${songs[next_song_index].title}`;
    next_song_artist.innerText = `${songs[next_song_index].artist}`;

    audio.src = `${song.song_path}`;
  }

  function ChangeSong(next = true) {
    if (next) {
      current_song_index++;
      next_song_index = current_song_index + 1;

      if (current_song_index > songs.length - 1) {
        current_song_index = 0;
        next_song_index = current_song_index + 1;
      }

      if (next_song_index > songs.length - 1) {
        next_song_index = 0;
      }
    } else {
      current_song_index--;
      next_song_index = current_song_index + 1;

      if (current_song_index < 0) {
        current_song_index = songs.length - 1;
        next_song_index = 0;
      }
    }
    UpdatePlayer();
    TogglePlaySong();
  }

  range.addEventListener("mousemove", setVolume);
  volume_down.addEventListener("click", volumeDown);
  volume_up.addEventListener("click", volumeUp);
  volume_mute.addEventListener("click", volumeMute);

  function volumeMute() {
    if (!audio.muted) {
      audio.muted = true;
      volume_mute.classList.add("muted");
      snackbar.innerText = `Volumed muted`;
      snackbar.className = "muted";
      setTimeout(function () {
        snackbar.className = snackbar.className.replace("muted", "");
      }, 3000);
    } else {
      audio.muted = false;
      volume_mute.classList.remove("muted");
    }
  }

  function volumeUp() {
    if (audio.volume >= 0 && audio.volume <= 0.9) {
      if (audio.muted) {
        volume_mute.classList.remove("muted");
        audio.muted = false;
      }
      audio.volume = audio.volume + 0.1;
      console.log(audio.volume, range.value);
      range.value = audio.volume * 100;
      snackbar.innerText = `Volumed up ${range.value}`;
      snackbar.className = "show";
      setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
      }, 3000);
    }
  }

  function volumeDown() {
    if (audio.volume >= 0.1 && audio.volume <= 1) {
      if (audio.muted) {
        volume_mute.classList.remove("muted");
        audio.muted = false;
      }
      audio.volume = audio.volume - 0.1;
      console.log(audio.volume, range.value);
      range.value = audio.volume * 100;
      snackbar.innerText = `Volumed down ${range.value}`;
      snackbar.className = "show";
      setTimeout(function () {
        snackbar.className = snackbar.className.replace("show", "");
      }, 3000);
    }
  }

  function setVolume() {
    audio.volume = range.value / 100;
  }

  // Add the "show" class to DIV

  // After 3 seconds, remove the show class from DIV
};
