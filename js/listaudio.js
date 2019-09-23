const GetAudioData = async () => {
    const response = await fetch("./php/getaudio.php");
    const data = await response.json();
    return data;
}

let GlobalAudioFiles = [];
let SelectedAudio;

const GetAudio = async () => {
    const AF = await GetAudioData();
    let AudioFiles = [];

    AF.forEach(file => {
        AudioFiles.push({
                audio: new Audio(file.directory),
                filter: file.filter,
                volume: file.volume,
                source: file.source,
                length: file.length,
                date: file.date
            }
        );
    });

    GlobalAudioFiles = AudioFiles;
    console.log(GlobalAudioFiles);
    ListAudio();
}

const ListAudio = () => {
    const AudioListElement = document.getElementById('AudioList');
    GlobalAudioFiles.forEach(file => {
        AudioListElement.innerHTML+= '<li class="AudioItem"><p class="AudioInfoPrev left" onclick="SelectAudio('+GlobalAudioFiles.indexOf(file)+')">'+file.source+'</p><p class="AudioInfoPrev" onclick="SelectAudio('+GlobalAudioFiles.indexOf(file)+')">'+file.volume+ ' ' +file.filter+'</p><p class="AudioInfoPrev InfoIcon" onclick="ShowInfo(\'index\')">i</p></li>'
    });

    // const InfoButtons = document.getElementsByClassName('InfoIcon');
    // for (let i = 0; i < InfoButtons.length; i++) {
    //     InfoButtons[i].offsetWidth = InfoButtons[i].offsetHeight;
    //     console.log(InfoButtons[i].offsetHeight);
    // }
}

const SelectAudio = (index) => {
    SelectedAudio = GlobalAudioFiles[index];
    Navto();
    //play audio
}