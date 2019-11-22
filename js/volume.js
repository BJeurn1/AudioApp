const VolumeDisplay = document.getElementById('VolumeDisplay');
const VolumeSlider = document.getElementById('VolumeSlider');
const CalibrationPage = document.getElementsByClassName('CalibrationPage')[0];
const AutoCalibButton = document.getElementsByClassName('AutoCalibButton')[0];
const PlayCalibTuneButton = document.getElementById('PlayCalibTuneButton');
const CalibTune = new Audio('./assets/calibtune/Toshiba RAV-SM304ATP-E  56 Db.wav');
CalibTune.loop = true;
let GlobalVolume = 150;
let AutoCalibEnabled = false;
let CalibTunePlaying = false;

const CalibrationToggle = () => {
	if (AudioActive) {
		PlayPause();
	}
	CalibrationPage.classList.toggle('active');
	CalibTune.pause();
	CalibTunePlaying = false;
	PlayCalibTuneButton.innerHTML = "<i class='far fa-play'></i>";
};

const AutoCalibrateToggle = () => {
	AutoCalibEnabled = !AutoCalibEnabled;
	AutoCalibButton.classList.toggle('active');
};

const PlayCalibTune = () => {
	CalibTunePlaying = !CalibTunePlaying;
	if (CalibTunePlaying == true) {
		CalibTune.play();
		PlayCalibTuneButton.innerHTML = "<i class='far fa-pause'></i>";
	} else {
		CalibTune.pause();
		PlayCalibTuneButton.innerHTML = "<i class='far fa-play'></i>";
	}
};

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
};

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

let LiveMeasuredDB = document.getElementsByClassName('CurrentDB');
let LiveMeasuredDBCalib = document.getElementById('CurrentDBCalib');
let CurrentMeasuredDB = document.getElementsByClassName('CurrentMeasuredDB');

if (navigator.getUserMedia) {
	navigator.getUserMedia(
		{
			audio: true
		},
		function(stream) {
			audioContext = new AudioContext();
			analyser = audioContext.createAnalyser();
			microphone = audioContext.createMediaStreamSource(stream);
			javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

			analyser.smoothingTimeConstant = 0.9;
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
					values += array[i];
				}

				var average = values / length;

				let val = Math.round(average);
				if (AutoCalibEnabled && CalibTunePlaying) {
					AutoCalib(val);
				}

				for (let el of LiveMeasuredDB) {
					el.innerHTML = val;
				}

				if (CalibTunePlaying) {
					if (val < 56 - 2) {
						LiveMeasuredDBCalib.classList.remove('tooloud');
						LiveMeasuredDBCalib.classList.add('toosoft');
						LiveMeasuredDBCalib.classList.remove('correct');
					} else if (val > parseInt(56) + 2) {
						LiveMeasuredDBCalib.classList.add('tooloud');
						LiveMeasuredDBCalib.classList.remove('toosoft');
						LiveMeasuredDBCalib.classList.remove('correct');
					} else {
						LiveMeasuredDBCalib.classList.remove('tooloud');
						LiveMeasuredDBCalib.classList.remove('toosoft');
						LiveMeasuredDBCalib.classList.add('correct');
					}
				} else {
					LiveMeasuredDBCalib.classList.remove('tooloud');
					LiveMeasuredDBCalib.classList.add('toosoft');
					LiveMeasuredDBCalib.classList.remove('correct');
				}
			};
		},
		function(err) {
			console.log('The following error occured: ' + err.name);
		}
	);
} else {
	console.log('getUserMedia not supported');
}

const AutoCalib = (MeasuredDB) => {
	if (!(GlobalVolume >= 300)) {
		if (MeasuredDB < 56) {
			GlobalVolume++;
		} else if (MeasuredDB > 56) {
			GlobalVolume--;
		}
	}
	VolumeDisplay.value = GlobalVolume;
	VolumeSlider.value = GlobalVolume;
	CalibTune.volume = 1 / 300 * GlobalVolume;
};
