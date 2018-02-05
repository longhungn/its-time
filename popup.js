(function() {
    const inpMinutes = document.querySelector('input#inp-timer-min');
    const inpSeconds = document.querySelector('input#inp-timer-sec');
    const minLeftDisp = document.querySelector('.timer-display.minutes');
    const secLeftDisp = document.querySelector('.timer-display.seconds');
    const startButton = document.querySelector('#btn-set-timer');
    const stopButton = document.querySelector('#btn-cancel-timer');
    const setUpForm = document.querySelector('#timer-setup form');
    var timer = 0;

    setUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        startButton.disabled = true;
        stopButton.disabled = false;

        var minutes = Number(inpMinutes.value);
        var seconds = Number(inpSeconds.value);
        inpMinutes.value = '';
        inpSeconds.value = '';
        var timeRemaining = minutes*60 + seconds;

        timer = setInterval(countdown, 1000);

        function countdown() {
            if (timeRemaining <= 0) {
                endTimer();
                return;
            }
            timeRemaining--;
            displayTimer();
        } 

        function displayTimer() {
            minLeft = String(Math.floor(timeRemaining / 60));
            secLeft = String(timeRemaining % 60);
            minLeftDisp.textContent = minLeft.length == 1 ? '0'+minLeft : minLeft;
            secLeftDisp.textContent = secLeft.length == 1 ? '0' +secLeft : secLeft;
        }

        function endTimer() {
            clearInterval(timer);
            chrome.tabs.executeScript({file: 'inject.js'})
            stopButton.disabled = true;
            startButton.disabled = false;
            console.log('Timer done')
        }
    });

    stopButton.addEventListener('click', function() {
        clearInterval(timer);
        stopButton.disabled = true;
        startButton.disabled = false;

        minLeftDisp.textContent = '00';
        secLeftDisp.textContent = '00';
    });

    inpMinutes.addEventListener('keyup', function() {
        if (inpMinutes.value.length === 2) {
            inpSeconds.focus();
        }
    })

    inpSeconds.addEventListener('keyup', function() {
        if (inpSeconds.value.length === 2) {
            startButton.focus();
        }
    })
    
    document.querySelector('#inject').addEventListener('click', function(){
        console.log('injecting');
        chrome.tabs.executeScript({file: 'inject.js'});
    });

})();