let timer = 0;
let timeRemaining = 0;

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name == "timer");
    console.log('Connected')

    port.onMessage.addListener(function(msg) {
        console.log(msg);
        switch (msg.type) {
            case 'START':
                startTimer(msg.timeLength);
                return;
            case 'STOP':
                stopTimer();
                return;
        }
    });
    
    function startTimer(timeLength) {
        clearInterval(timer);
        timeRemaining = timeLength;
        
        updateView();
        timer = setInterval(function () {
            console.log('time left: '+timeRemaining)
            if (timeRemaining <= 0) {
                endTimer();
                return;
            }
            timeRemaining--;
            updateView();
        }, 1000);
    }
    
    function updateView() {
        port.postMessage({
            type: 'UPDATE',
            timeLeft: timeRemaining,
        });
    }
    
    function endTimer() {
        clearInterval(timer);
        port.postMessage({
            type: 'END'
        });
        chrome.tabs.executeScript({file: 'inject.js'})
    }
    
    function stopTimer() {
        clearInterval(timer);
    }
    
  });
  
