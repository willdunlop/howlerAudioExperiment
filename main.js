
const container = document.getElementById("container");
const activeTrackElm = document.getElementById("activeTrack");
const trackProgress = document.getElementById("audioProgress");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const switchTrack = document.getElementById("switch");


const oceanCalm = new Howl({
    src: ['audio/ocean-calm.ogg'],
    loop: true,
    volume: 1,
});
const oceanMedium = new Howl({
    src: ['audio/ocean-medium.ogg'],
    loop: true,
    volume: 1,
});

let activeSound = oceanCalm;
activeTrackElm.innerHTML = "Calm Ocean";

play.onclick = () => activeSound.play();
pause.onclick = () => activeSound.pause();

const updateProgress = timestamp => {
    trackProgress.value = (activeSound.seek() / activeSound.duration()) * 100;
    if(activeSound.playing()) requestAnimationFrame(updateProgress);
}  

const update = () => {
    trackProgress.value = 0;
    activeSound.on('play', updateProgress)
}

const fadeOutTrack = track => {
    if (track.volume() >= 0) track.fade(1, 0, 3000);
    else track.pause();
}

const fadeInTrack = track => {
    if (track.volume() <= 1) track.fade(0, 1, 3000);
    else return;
}

switchTrack.onclick = () => {
    if (activeSound === oceanCalm) {
        fadeOutTrack(oceanCalm);
        activeTrackElm.innerHTML = "Active Ocean";
        oceanMedium.volume(0);
        oceanMedium.play()
        fadeInTrack(oceanMedium);

        activeSound = oceanMedium
        update();
    } else {
        fadeOutTrack(oceanMedium);
        activeTrackElm.innerHTML = "Calm Ocean";
        oceanCalm.volume(0);
        oceanCalm.play()
        fadeInTrack(oceanCalm);
        
        activeSound = oceanCalm;
        update();
    }
}

dragElement(container, "window");
update();


