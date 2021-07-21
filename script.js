const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const startTime = document.querySelector(".start-time");
const endTime = document.querySelector(".end-time");
const volBtn = document.querySelector("#vol-btn");
const userSearchData = document.querySelector("#input-data");
const searchBtn = document.querySelector(".search");
const searchPlayBtn = document.querySelector(".play-btn");
const crossBtn = document.querySelector(".cross-btn");


// song data
const songs = ["Badfella", "Brown Shortie", "Dollar", "Legend", "Moosedrilla", "Old Skool", "Same Beef",
 "Sanju", "Sin", "So High", "Sohne Lagde"];

const songLower = songs.map(ele => ele.toLowerCase());  

let songIndex = 0;


// initially load song in dom
loadSong(songs[songIndex]);

// update the song details
function loadSong(song){
  title.innerText = song;
  audio.src = `songs/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
}


// this will play the song
function playSong(){
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}


// this will pause the song
function pauseSong(){
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}


// this will play prev song
function prevSong(){
  songIndex--;
  if(songIndex < 0){
    songIndex = songs.length-1;
  }

  loadSong(songs[songIndex]);
  playSong();
  
}



// this will play next song
function nextSong(){
  songIndex++;
  if(songIndex == songs.length){
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}



// convert seconds to minutes
function convertToMin(sec){
  min = Math.trunc(sec/60);
  seconds = Math.trunc(sec%60);
  if(seconds<10){
    seconds = "0"+seconds;
  }
  return "0"+ min+":"+seconds
}



// update progress in seekbar
function updateProgress(e){
  let duration = e.srcElement.duration;
  let currentTime = e.srcElement.currentTime;
  let progressPercent = (currentTime/duration)*100;
  progress.style.width = `${progressPercent}%`;
  startTime.innerHTML = convertToMin(currentTime);
  if(startTime.innerHTML == "00:00"){
    endTime.innerHTML = "00:00";
  }
  else{
    endTime.innerHTML = convertToMin(duration);
  }
  
}



// set progress in seekbar
function setProgress(e){
  let width = this.clientWidth;
  let clickX = e.offsetX;
  let duration = audio.duration;
  console.log(width, clickX, duration);
  audio.currentTime = (clickX/width)*duration;
}



// event listeners
playBtn.addEventListener("click", function(){
  const isPlaying = musicContainer.classList.contains("play");
  if(isPlaying){
    pauseSong();
  }
  else{
    playSong();
  }
})


// change song events
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);


// volume button functionality
let ele;
volCreation();
volBtn.addEventListener("mouseover", function(){
  document.querySelector(".volume").appendChild(ele);
  const seekBtn = document.querySelector("#vol-seek");
  seekBtn.addEventListener("change", function(){
    audio.volume =  (seekBtn.value)/20;
    console.log(audio.volume);
  })
})

volBtn.addEventListener("mouseenter", function(){
  document.querySelector(".volume").removeChild(ele);
})




let inputResult = document.querySelector(".input-results");
let notFoundEle = `<div class="output-text">No song match your results</div>`;


// search any song
searchBtn.addEventListener('click', function(){
  let userInput = userSearchData.value;
  document.querySelector(".input-results").style.display = "block";
  setTimeout(() => inputResult.style.display = "none", 3000);
  if(songLower.includes(userInput)){
    songIndex = songLower.indexOf(userInput);
    console.log(songIndex);
    let foundEle = `<div class="song-found">${songs[songIndex]}</div>
    <button class="play-btn"><i class="fas fa-play small"></i></button>`; 
    styling();
    inputResult.innerHTML = foundEle;
    let smallBtn = document.querySelector(".small");
    smallBtn.style.cursor = "pointer";
    smallBtn.addEventListener("click", function(){
      loadSong(songs[songIndex]);
      playSong();
    })
    
  }
  else{
    styling();
    document.querySelector(".input-results").innerHTML = notFoundEle;
  }
})




function styling(){
  inputResult.style.display = "flex";
    inputResult.style.alignitems = "center";
    inputResult.style.justifycontent = "center";
}


function volCreation(){
  ele = document.createElement("input");
  ele.type = "range";
  ele.id = "vol-seek";
  ele.min = "0";
  ele.max = "20";
  ele.value = "10";
  ele.style.cursor = "pointer";
}







