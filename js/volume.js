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
}