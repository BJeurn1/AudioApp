const BodyLoad = () => {
    setTimeout(function (){
        const LoadWrapper = document.getElementsByClassName('LoadingWrapper')[0];
        LoadWrapper.classList.remove('visible');
        setTimeout(function (){
            LoadWrapper.classList.add('gone');
            GetAudio();
        }, 600);
    }, 600);
}