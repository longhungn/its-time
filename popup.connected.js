(function() {
    const port = chrome.runtime.connect({name: 'timer'});
    console.log('Port opened')

    const inpMinutes = document.querySelector('input#inp-timer-min');
    const inpSeconds = document.querySelector('input#inp-timer-sec');
    const minLeftDisp = document.querySelector('.timer-display.minutes');
    const secLeftDisp = document.querySelector('.timer-display.seconds');
    const startButton = document.querySelector('#btn-set-timer');
    const stopButton = document.querySelector('#btn-cancel-timer');
    const setUpForm = document.querySelector('#timer-setup form');
    var timer = 0;

    port.onMessage.addListener(function(msg){
        console.log(msg.type);
        switch (msg.type) {
            case 'UPDATE':
                displayTimer(msg.timeLeft);
                return;
            case 'END':
                displayTimer(0);
                enableStartBtn();
                return;
        }
    });

    function displayTimer(timeRemaining) {
        let minLeft = String(Math.floor(timeRemaining / 60));
        let secLeft = String(timeRemaining % 60);
        minLeftDisp.textContent = minLeft.length == 1 ? '0'+minLeft : minLeft;
        secLeftDisp.textContent = secLeft.length == 1 ? '0' +secLeft : secLeft;
    }

    function enableStartBtn() {
        stopButton.disabled = true;
        startButton.disabled = false;
    }

    function enableStopBtn() {
        stopButton.disabled = false;
        startButton.disabled = true;
    }

    //starting the timer
    setUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var minutes = Number(inpMinutes.value);
        var seconds = Number(inpSeconds.value);
        inpMinutes.value = '';
        inpSeconds.value = '';
        var timeRemaining = minutes*60 + seconds;

        port.postMessage({
            type: 'START',
            timeLength: timeRemaining,
        });
        enableStopBtn();

    });

    stopButton.addEventListener('click', function() {
        port.postMessage({
            type: 'STOP'
        });

        enableStartBtn();

        displayTimer(0);
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
        console.log('debug');
        port.postMessage({type: 'HELLO'});
    });

})();