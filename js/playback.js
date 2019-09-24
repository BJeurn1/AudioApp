let LoopAudio = false;
let AudioActive = false;
let SelectedAudio;
let SelectedREALAudio = new Audio();
let LengthBarCurr = 0;
let LengthSecondsPlayed = 0;
let LengthBarWPS; //width per second

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
    LengthBarCurr = 0;
    PlayPauseButton.innerHTML = "<i class='far fa-pause'></i>";
    MeasuredDB.innerHTML = "Original: " + SelectedAudio.volume + " " + SelectedAudio.filter;
    CurFileName.innerHTML = SelectedAudio.source;
    CurFileLength.innerHTML = "0:00";
    PlaybackBar.style.width = LengthBarCurr;
    MaxFileLength.innerHTML = ConvertLength(SelectedAudio.length);
    LengthBarWPS = 100 / SelectedAudio.length;
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
        LengthBarCurr+=LengthBarWPS;
        PlaybackBar.style.width = LengthBarCurr + "%";
        LengthSecondsPlayed++;
        CurFileLength.innerHTML = ConvertLength(LengthSecondsPlayed);

        if (LengthBarCurr >= 100 && LoopAudio) {
            SelectedREALAudio.play();
            LengthBarCurr = 0;
            LengthSecondsPlayed = 0;
        } else if (LengthBarCurr >= 100) {
            LengthBarCurr = 0;
            LengthSecondsPlayed = 0;
            PlayPauseButton.innerHTML = "<i class='far fa-play'></i>";
            AudioActive = false;
        }
    }
}, 1000);