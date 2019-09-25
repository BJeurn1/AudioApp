const GetAudioData = async () => {
    const response = await fetch("./php/getaudio.php");
    const data = await response.json();
    return data;
}

let GlobalAudioFiles = [];
let SelectedAudioSource;

const GetAudio = async () => {
    const AF = await GetAudioData();
    let AudioFiles = [];

    AF.forEach(file => {
        let audio = new Audio(file.directory);
        AudioFiles.push({
                audio: audio,
                filter: file.filter,
                volume: file.volume,
                source: file.source,
                length: '',
                date: file.date 
            }
        );
    });

    setTimeout(function (){
        ListAudioLength();
    }, 1000);

    GlobalAudioFiles = AudioFiles;
    ListAudio();
}

const ListAudioLength = () => {
    GlobalAudioFiles.forEach (file => {
        file.length = file.audio.duration;
    })
}

const ListAudio = () => {
    const AudioListElement = document.getElementById('AudioList');
    GlobalAudioFiles.forEach(file => {
        AudioListElement.innerHTML+= '<li class="AudioItem"><p class="AudioInfoPrev" onclick="SelectAudio('+GlobalAudioFiles.indexOf(file)+', this.innerHTML)">'+file.source+'</p><p class="AudioInfoPrev" onclick="SelectAudio('+GlobalAudioFiles.indexOf(file)+')">'+file.volume+ ' ' +file.filter+'</p><p class="AudioInfoPrev InfoIcon" onclick="ShowInfo(\'index\')">i</p></li>'
    });
}

const SelectAudio = (index, newsource) => {
    const AudioItems = document.getElementsByClassName('AudioItem');
    for (let i = 0; i < AudioItems.length; i++) {
        if (AudioItems[i].innerHTML.includes(SelectedAudioSource)) {
            AudioItems[i].classList.remove('active');
        } else if (AudioItems[i].innerHTML.includes(newsource)) {
            AudioItems[i].classList.add('active');
        }
    }

    SelectedAudioSource = newsource;
    SelectedAudio = GlobalAudioFiles[index];
    SelectedREALAudio = GlobalAudioFiles[index].audio;
    SelectedREALAudio.volume = 1 / 300 * GlobalVolume;;

    Navto();
    PlayAfterSelect();
}