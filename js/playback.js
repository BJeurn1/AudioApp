let LoopAudio = false;
let AudioActive = false;
let SelectedAudio;
let SelectedREALAudio = new Audio();

const CurFileName = document.getElementById('FileTitleSource');
const MeasuredDB = document.getElementById('OriginalDB');
const MaxFileLength = document.getElementById('FileMaxLength');
const CurFileLength = document.getElementById('FileCurLength');
const PlaybackBar = document.getElementsByClassName('ProgressbarInside')[0];
const LoopButton = document.getElementsByClassName('LoopButton')[0];
const PlayPauseButton = document.getElementsByClassName('PlayPauseButton')[0];

const ToggleLoop = () => {
    LoopButton.classList.toggle('active');
    LoopAudio = !LoopAudio;
    SelectedREALAudio.loop = LoopAudio;
}

const PlayPause = () => {
    if (document.getElementById('FileTitleSource').innerHTML != "Nothing Selected") {
        AudioActive = !AudioActive;
        if (AudioActive) {
            SelectedREALAudio.play();
            PlayPauseButton.innerHTML = "<i class='far fa-pause'></i>";
        } else {
            SelectedREALAudio.pause();
            PlayPauseButton.innerHTML = "<i class='far fa-play'></i>";
        }
    }
}

const PlayAfterSelect = () => {
    PlayPauseButton.innerHTML = "<i class='far fa-pause'></i>";
    MeasuredDB.innerHTML = "Original: " + SelectedAudio.volume + " " + SelectedAudio.filter;
    CurFileName.innerHTML = SelectedAudio.source;
    CurFileLength.innerHTML = "0:00";
    PlaybackBar.style.width = (100 / SelectedREALAudio.length) * SelectedREALAudio.currentTime;
    MaxFileLength.innerHTML = ConvertLength(SelectedAudio.length);
    SelectedREALAudio.play();
    AudioActive = true;
}

const ConvertLength = (length) => {
    let ConvertedLength;
    let RoundLength = Math.round(length);
    let Minutes = Math.floor(RoundLength / 60);
    ConvertedLength=Minutes+":";
    let Seconds = RoundLength - Minutes * 60;
    if (Seconds <= 9) {Seconds = '0' + Seconds}
    ConvertedLength+=Seconds;
    return ConvertedLength;
}

const SecondTimer = setInterval(function() { 
    if (AudioActive) {
        PlaybackBar.style.width = (100 / SelectedREALAudio.duration) * SelectedREALAudio.currentTime + "%";
        CurFileLength.innerHTML = ConvertLength(SelectedREALAudio.currentTime);
        if (SelectedREALAudio.currentTime >= SelectedREALAudio.duration && !LoopAudio) {
            LengthBarCurr = 0;
            PlayPauseButton.innerHTML = "<i class='far fa-play'></i>";
            CurFileLength.innerHTML = ConvertLength(0);
            PlaybackBar.style.width = '0%';
            AudioActive = false;
        }
    }
}, 250);