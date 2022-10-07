// get variable

let songIndex = 0
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById("gif")
let masterSongName = document.getElementById("masterSongName")
let songItems = Array.from(document.getElementsByClassName('songItem'))


let songs = [
   {songName:"basabriya", filePath:"songs/0.mp3" , coverPath:"covers/1.jpg"},
   {songName:"falling-down" , filePath:"songs/1.mp3" , coverPath:"covers/2.jpg"},
   {songName:"subhanallah" , filePath:"songs/2.mp3" , coverPath:"covers/3.jpg"},
   {songName:"kun-faya-kun" , filePath:"songs/3.mp3" , coverPath:"covers/4.jpg"},
   {songName:"ager-tum-sath" , filePath:"songs/4.mp3" , coverPath:"covers/5.jpg"},
]

 songItems.forEach((element , i) => {
   //  console.log(element , i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName

 })

   // play and puase song
   masterPlay.addEventListener("click" , () => {
      if(audioElement.paused || audioElement.currentTime <= 0){
         audioElement.play();
         masterPlay.classList.remove('fa-play')
         masterPlay.classList.add('fa-pause')
         gif.style.opacity = 1
    }
    else{
      audioElement.pause();
      masterPlay.classList.remove('fa-pause')
      masterPlay.classList.add('fa-play')
      gif.style.opacity = 0
    }
   })

// listen to event
audioElement.addEventListener('timeupdate' , ()=>{
   // console.log("timeupdate");

   // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100)
   //  console.log(progress);

   myProgressBar.value = progress
})

myProgressBar.addEventListener('change' , () => {
   audioElement.currentTime = myProgressBar.value*audioElement.duration/100;

})

const makeAllPlays = () => {
   Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
      // console.log(element);
             element.classList.remove("fa-pause")
             element.classList.add("fa-play")
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
   element.addEventListener('click' , (e)=> {
         //  console.log(e.target);
         
         makeAllPlays()
         songIndex = parseInt(e.target.id);
         e.target.classList.remove("fa-play");
         e.target.classList.add("fa-pause");
         
        audioElement.src = `songs/${songIndex}.mp3`;
        masterSongName.innerHTML = songs[songIndex].songName
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');

   })
})

document.getElementById('next').addEventListener('click' , () => {
   if(songIndex >= 4){
      songIndex = 0;
   }
   else{
      songIndex += 1;
   }

   audioElement.src = `songs/${songIndex}.mp3`;
   masterSongName.innerHTML = songs[songIndex].songName
   audioElement.play();
   gif.style.opacity = 1
   audioElement.currentTime = 0;
   masterPlay.classList.remove('fa-play');
   masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click' , () => {
   if(songIndex <= 0){
      songIndex = 0;
   }
   else{
      songIndex -= 1;
   }

   audioElement.src = `songs/${songIndex}.mp3`;
   masterSongName.innerHTML = songs[songIndex].songName
   audioElement.play();
   gif.style.opacity = 1
   audioElement.currentTime = 0;
   masterPlay.classList.remove('fa-play');
   masterPlay.classList.add('fa-pause');
})