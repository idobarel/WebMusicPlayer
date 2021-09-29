const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const volProgress = document.querySelector('.vol-progress')
const volProgressContainer = document.querySelector('.vol-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')
const ONSTARTVOLUME = 0.3;
const addMusicBtn = document.getElementById('upload-btn')
const actualBtn = document.getElementById('actual-btn');
const fileChosen = document.getElementById('file-chosen');
const actualBtn1 = document.getElementById('img-upload');
const fileChosen1 = document.getElementById('img-chosen');
const bgModal = document.querySelector('.bg-modal');
const modalCloseBtn = document.querySelector('.close-btn')

actualBtn.addEventListener('change', function(){
  fileChosen.textContent = this.files[0].name
})



actualBtn1.addEventListener('change', function(){
  fileChosen1.textContent = this.files[0].name
})

updateVol(ONSTARTVOLUME)

//Song titles
songs = JSON.parse(localStorage.getItem('Songs')) || ['OK', 'BlackHearted']


//
let songIndex = 0

//load song

loadSong(songs[songIndex])

//update the song d

function loadSong(song){
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play();
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause();
}


function prevSong(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex])
    playSong()
}

function nextSong(){
    songIndex++
    if(songIndex > songs.length -1){
        songIndex = 0;
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

}

function setProgress(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration


    audio.currentTime = (clickX / width) * duration;
}

function updateVol(vol){
    volProgress.style.width = `${vol * 100}%`
    audio.volume = vol
}

function setVol(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const volume = 1

    const newVol = (clickX / width) * volume

    audio.volume = newVol;
    volProgress.style.width = `${newVol * 100}%`
}

function openForm(){
    bgModal.style.display = 'flex';
}

function closeForm(){
    bgModal.style.display = 'none';
}

async function addItem(){
    files_name = document.getElementById('files-name').value;
    songupload = document.getElementById('actual-btn');
    imgupload = document.getElementById('img-upload');
    if(songs.includes(files_name)){
        alert('This song is alrady in ur playlist!')
        return;
    }
    songs.push(files_name)
    localStorage.setItem('Songs', JSON.stringify(songs))
    let form_data = new FormData();
    form_data.append("files_name", files_name);
    form_data.append("song_file", songupload.files[0]);
    form_data.append("img_file", imgupload.files[0]);
    await fetch('/upload.php', {method: "POST", body: form_data});
    alert('Uploaded!');
    closeForm();
}

function showItems(){
    console.log(songs)
}


//Event

playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
})


prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

volProgressContainer.addEventListener('click', setVol)

audio.addEventListener('ended', nextSong)

addMusicBtn.addEventListener('click', openForm)

modalCloseBtn.addEventListener('click', closeForm)