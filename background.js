let timer = 0;
let timeRemaining = 0;
let port;

chrome.runtime.onConnect.addListener(function(p) {
    console.assert(p.name == "timer");
    console.log('Connected')
    if (p != 'timer') 
        return;
    
    port = p;

    port.onMessage.addListener(function(msg) {
        console.log('received a message');
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
            if (timeRemaining <= 0) {
                endTimer();
                return;
            }
            timeRemaining--;
            updateView();
        });
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
  
