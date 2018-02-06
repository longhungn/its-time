(function() {
    const inpMinutes = document.querySelector('input#inp-timer-min');
    const inpSeconds = document.querySelector('input#inp-timer-sec');
    const minLeftDisp = document.querySelector('.timer-display.minutes');
    const secLeftDisp = document.querySelector('.timer-display.seconds');
    const startButton = document.querySelector('#btn-set-timer');
    const stopButton = document.querySelector('#btn-cancel-timer');
    const setUpForm = document.querySelector('#timer-setup form');
    
    const background = chrome.extension.getBackgroundPage();
    if (background.timer.running) {
        disableStartBtn();
    } else {
        enableStartBtn();
    }

    background.timer.on('update', function(time) {
        displayTimer(time);
    })

    setUpForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let minutes = Number(inpMinutes.value);
        let seconds = Number(inpSeconds.value);
        inpMinutes.value = '';
        inpSeconds.value = '';
        let duration = minutes*60 + seconds;
        disableStartBtn();
        //start timer in background
        background.timer.startTimer(duration);
        
    });

    stopButton.addEventListener('click', function() {
        background.timer.cancelTimer();
    });

    inpMinutes.addEventListener('keyup', function() {
        if (inpMinutes.value.length === 2) {
            inpSeconds.focus();
        }
    });

    inpSeconds.addEventListener('keyup', function() {
        if (inpSeconds.value.length === 2) {
            startButton.focus();
        }
    });

    function displayTimer(time) {
        if (time == 0) {
            enableStartBtn();
        }
        minLeft = String(Math.floor(time / 60));
        secLeft = String(time % 60);
        minLeftDisp.textContent = minLeft.length == 1 ? '0'+minLeft : minLeft;
        secLeftDisp.textContent = secLeft.length == 1 ? '0' +secLeft : secLeft;
    }

    function enableStartBtn() {
        stopButton.disabled = true;
        startButton.disabled = false;
    }

    function disableStartBtn() {
        stopButton.disabled = false;
        startButton.disabled = true;
    }

})();