const GetAudioData = async () => {
    const response = await fetch("./php/getaudio.php");
    const data = await response.json();
    return data;
}

let GlobalAudioFiles = [];

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

    ListAudio();
}

const ListAudio = () => {
    GlobalAudioFiles.forEach(file => {
        
    });
}