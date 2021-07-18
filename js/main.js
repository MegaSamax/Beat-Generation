// Gets The Beat from Audo - https://github.com/simianarmy/bpmcounter
var context, analyser, 
    bpm, bpmDisplay, currentBPMDisplay;
var SAMPLE_SIZE = 2048; 

var currentSong_bpm = 0; 

function main () {
    context = new AudioContext();
    analyser = context.createAnalyser();
    bpmDisplay = document.getElementById('bpm');
    currentBPMDisplay = document.getElementById('current_bpm');
    bpm = new BeatDetektor(85, 169);

    analyser.fftSize = SAMPLE_SIZE;

    let audio = document.querySelector('#song');
    let audio2 = document.querySelector('#song2');
    var stream = context.createMediaElementSource(audio);

    stream.connect(analyser);
    
    audio.play();
    
    // Delay Audio to Match BMP beats
    setTimeout(function(){
      audio2.play();  
    }, 7500);

    visualizerUpdate();
}

function visualizerUpdate (time) {
    var data = new Uint8Array(SAMPLE_SIZE);
    analyser.getByteFrequencyData(data);    

    // Beatdetektor api
    bpm.process(time/1000, data);
    bpmDisplay.innerHTML = bpm.win_bpm_int_lo;

    if (bpm.win_bpm_int_lo != currentSong_bpm && bpm.win_bpm_int_lo != 0) {
        currentSong_bpm = bpm.win_bpm_int_lo;
        var bpmEvent = new CustomEvent('gameBpm', { detail: currentSong_bpm });
        document.dispatchEvent(bpmEvent);
    }
    window.requestAnimationFrame(visualizerUpdate);
}