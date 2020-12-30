let fillbar = document.querySelector('.fill');
let audios = ["audio1.mp3", "audio2.mp3", "audio3.mp3"];
let covers = ["Cover_One.png", "Cover_Two.png", "Cover_Three.png"];
let currentTime = document.querySelector('.time');

// Create an object of audio
let audio = new Audio();
let currentSong = 0;

// Song should play automatically whenever the wimdow loads

window.onload = playSong;

// Create a function that plays the song whenever the window loads
function playSong(){
    audio.src = audios[currentSong];
    audio.play();
}

function togglePlayPause(){
    if(audio.paused){
        audio.play();
        let playBtn = document.querySelector('.play-pause');
        playBtn.innerHTML = '<i class="fa fa-pause"></i>';
        playBtn.style.paddingLeft ='30px';
    }else{
        audio.pause();
        playBtn = document.querySelector('.play-pause');
        playBtn.innerHTML = '<i class="fa fa-play"></i>';
        playBtn.style.paddingLeft ='33px';
    }
}

//Making the fillbar dynamic
audio.addEventListener("timeupdate", function(){
    let position = audio.currentTime / audio.duration;
    fillbar.style.width = position * 100 + "%";

    // Working on duration
    convertTime(Math.round(audio.currentTime));

    //Play next song when the current song is completed
    if(audio.ended){
        nextAudio();
    }
});

function convertTime(seconds){
    let min = Math.floor(seconds/60);
    let sec = seconds % 60;
    
    // fix the single digit
    min = min < 10? "0" + min : min;
    sec = sec < 10? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;

    // fix the total time
    totalTime(Math.round(audio.duration));
}

function totalTime(seconds){
    let min = Math.floor(seconds/60);
    let sec = seconds % 60;
    
    // fix the single digit
    min = min < 10? "0" + min : min;
    sec = sec < 10? "0" + sec : sec;
    currentTime.textContent += " & " + min + ":" + sec;
}

// Working on the next and previous buttons
function nextAudio(){
    currentSong++;
    if(currentSong > 2){
        currentSong = 0;
    }
    playSong();
    playBtn = document.querySelector('.play-pause');
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft ='30px';

    // Just one jquery for changing the covers
    $(".img img").attr("src", covers[currentSong]);
}

function prevAudio(){
    currentSong--;
    if(currentSong < 0){
        currentSong = 2;
    }
    playSong();
    playBtn = document.querySelector('.play-pause');
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    playBtn.style.paddingLeft ='30px';

    // Just one jquery for changing the covers
    $(".img img").attr("src", covers[currentSong]);
}

// Working on the mute, volume down and volume up buttons
function decreaseVolume(){
    audio.volume -= 0.25;
}

function increaseVolume(){
    audio.volume += 0.25;
}

function muteVolume(){
    if(audio.volume === 1){
    audio.volume = 0;
    speakerBtn = document.querySelector('.volume-up');
    speakerBtn.innerHTML = '<i class="fa fa-volume-mute"></i>';
    speakerBtn.style.paddingLeft ='30px';
    }else{
    audio.volume = 1;
    speakerBtn = document.querySelector('.volume-up');
    speakerBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
    speakerBtn.style.paddingLeft ='30px';
    }
}

//Working with repeat and reshuffle buttons
function repeatSong(){

}

function reshuffleSong(){
    currentSong = Math.random();
}
