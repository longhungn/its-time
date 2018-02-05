(function(){
    console.log('inject.js running');
    const body = document.querySelector('body');
    const videoElem = document.querySelector('.time-to-stop-frank'); //return first matching elem only
    if (videoElem !== null) {
        return;
    }

    let videoContainer = document.createElement('div');
    videoContainer.className = 'time-to-stop-frank';
    videoContainer.style.cssText = ('position: fixed; bottom: -44px; z-index: 99999; right: 0px; height: 360px; width: 480px; pointer-events: none; user-select: none');
    body.appendChild(videoContainer);

    let video = document.createElement('video');
    videoContainer.appendChild(video);
    video.style.cssText = ('width: 100%; height: 100%;');
    video.style.visibility = 'hidden';
    video.src = chrome.runtime.getURL('media/stop.webm');
    video.load();
    video.addEventListener('loadeddata', function() {
        console.log('Video loaded');
        video.style.visibility = 'visible';
        video.play();
    })
    video.addEventListener('ended', function() {
        body.removeChild(videoContainer);
    })


})();