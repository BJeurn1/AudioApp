let CurPage = 'playback';

const Navto = () => {
    const MenuItems = document.getElementsByClassName('MenuItem');
    Array.from(MenuItems).forEach((item) => {
        item.classList.toggle('active');
    });

    const Pages = document.getElementsByClassName('Page');
    Array.from(Pages).forEach((Page) => {
        Page.classList.toggle('active');
    });
}

const DetailsPage = document.getElementsByClassName('DetailsPage')[0].classList.toggle('active');
const DetailsFilter = document.getElementById('DetailsFilter');
const DetailsVolume = document.getElementById('DetailsVolume');
const DetailsDate = document.getElementById('DetailsDate');
const DetailsLength = document.getElementById('DetailsLength');
const DetailsTitle = document.getElementById('DetailsTitle');

const ShowInfo = (index) => {
    let SelectedAudio = GlobalAudioFiles[index];
    DetailsFilter.innerHTML = SelectedAudio.filter;
    DetailsVolume.innerHTML = SelectedAudio.volume;
    DetailsDate.innerHTML = SelectedAudio.date;
    DetailsLength.innerHTML = Math.round(SelectedAudio.length);
    DetailsTitle.innerHTML = SelectedAudio.source;
    document.getElementsByClassName('DetailsPage')[0].classList.toggle('active');
}