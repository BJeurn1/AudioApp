const VolumeDisplay = document.getElementById('VolumeDisplay');
const VolumeSlider = document.getElementById('VolumeSlider');
let GlobalVolume = 150;

const UpdateVolume = (value) => {
    if (value == 'minus' && GlobalVolume > 0) {
        GlobalVolume--;
    } else if (value == 'plus' && GlobalVolume < 300) {
        GlobalVolume++;
    } else if (value > 300) {
        GlobalVolume = 300;
    } else {
        GlobalVolume = value;
    }

    VolumeDisplay.value = GlobalVolume;
    VolumeSlider.value = GlobalVolume;

    SelectedREALAudio.volume = 1 / 300 * GlobalVolume;
}

navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia;

let LiveMeasuredDB = document.getElementById('CurrentDB');
let CurrentMeasuredDB = document.getElementById('CurrentMeasuredDB');

if (navigator.getUserMedia) {
    navigator.getUserMedia({
        audio: true
    },
    function(stream) {
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = .9;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);

        javascriptNode.onaudioprocess = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var values = 0;

            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += (array[i]);
            }

            
            var average = values / length;
        
            let val = Math.round(average);
            AutoCalib(val);
            LiveMeasuredDB.innerHTML = val;
            if (AudioActive) {
                if (val < SelectedAudio.volume - 2) {
                    CurrentMeasuredDB.classList.remove('tooloud');
                    CurrentMeasuredDB.classList.add('toosoft');
                    CurrentMeasuredDB.classList.remove('correct');
                } else if (val > parseInt(SelectedAudio.volume) + 2) {
                    CurrentMeasuredDB.classList.add('tooloud');
                    CurrentMeasuredDB.classList.remove('toosoft');
                    CurrentMeasuredDB.classList.remove('correct');
                } else {
                    CurrentMeasuredDB.classList.remove('tooloud');
                    CurrentMeasuredDB.classList.remove('toosoft');
                    CurrentMeasuredDB.classList.add('correct');
                }
            } else {
                CurrentMeasuredDB.classList.remove('tooloud');
                CurrentMeasuredDB.classList.add('toosoft');
                CurrentMeasuredDB.classList.remove('correct');
            }
        }
    },
    function(err) {
      console.log("The following error occured: " + err.name)
    });
} else {
  console.log("getUserMedia not supported");
}

const AutoCalib = (MeasuredDB) => {
    console.log('looping');
    if (AudioActive) {
        console.log('loopingactive');
        if (SelectedAudio.volume > MeasuredDB) {
            console.log('toolow');
            GlobalVolume++;
        } else if (SelectAudio.volume < MeasuredDB) {
            console.log('tooloud');
            GlobalVolume--;
        }   2
        
        VolumeDisplay.value = GlobalVolume;
        VolumeSlider.value = GlobalVolume;
    }
}