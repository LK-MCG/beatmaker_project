

// remenber querySelectorAll will grab all of the elements with that class.

//allso you can type part of the class name witch is the same as others allowing
// you to grab similar classes together with the same name

class DrumKit{
  constructor(){
    this.pads = document.querySelectorAll('.pad');
    this.playButton = document.querySelector('.play');
    this.currentKick = 'allSounds/kick-classic.wav';
    this.currentSnare = 'allSounds/snare-acoustic01.wav';
    this.currentHihat = 'allSounds/hihat-acoustic01.wav';
    this.kickAudio = document.querySelector('.kick-sound');
    this.snareAudio = document.querySelector('.snare-sound');
    this.hihatAudio = document.querySelector('.hihat-sound');
    this.index = 0;
    this.bpm = 120;
    this.isPlaying = null;
    this.selects = document.querySelectorAll('select');
    this.muteBtns = document.querySelectorAll('.mute');
    this.tempoSlider = document.querySelector('.tempo-slider');
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat(){
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // loop over the pads
    activeBars.forEach(bar => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      //check if the pads are active
      if (bar.classList.contains("active")) {
        //ckeck eack sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
      const interval = (60 / this.bpm) * 1000;
      //check if its playing
      if (!this.isPlaying) {
    this.isPlaying = setInterval(() => {
      this.repeat();
    }, interval);
  } else {
    // clear the interval
    clearInterval(this.isPlaying);
    console.log(this.isPlaying);
    this.isPlaying = null;

    }
  }
  updateBtn() {
    if (!this.isPlaying) {
      this.playButton.innerText = "stop";
      this.playButton.classList.add("active");
    } else {
      this.playButton.innerText = "play";
      this.playButton.classList.remove("active");
    }
  }
  changeSound(e){
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
      this.kickAudio.src = selectionValue;
      break;
      case "snare-select":
      this.snareAudio.src = selectionValue;
      break;
      case "hiHat-select":
      this.hihatAudio.src = selectionValue;
      break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
            this.kickAudio.volume = 0;
          break;
        case "1":
            this.snareAudio.volume = 0;
            break;
        case "2":
            this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
        this.kickAudio.volume = 1;
        break;
        case "1":
        this.snareAudio.volume = 1;
        break;
        case "2":
        this.hihatAudio.volume = 1;
        break;
          }
        }
      }
        changeTempo(e){
          const tempoText = document.querySelector('.tempo-nr');
          this.bpm = e.target.value;
          tempoText.innerText = e.target.value;
        }
        updateTempo(e){
          this.bpm = e.target.value;
          clearInterval(this.isPlaying);
          this.isPlaying = null;
          const playBtn = document.querySelector(".play");
          if (playBtn.classList.contains("active")) {
            this.start();
          }
        }
      }




// addEventListener
//so here on the click you can call the method activepad from
// remember drumKit is an instants of the main constructor function and has all the same properties
const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
  pad.addEventListener('click', drumKit.activePad)
  pad.addEventListener('animationend', function(){
    this.style.animation = "";
  });
});

//we have to envoc drumKit.start in a function because the scope will not allow
// it as it is setting the this keyword to the playButton whick is not what we want.
drumKit.playButton.addEventListener('click', function() {
  drumKit.updateBtn();
  drumKit.start();

});

drumKit.selects.forEach(select => {
  select.addEventListener('change', function(e) {
    drumKit.changeSound(e);
  });
});
  drumKit.muteBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      drumKit.mute(e);
    });
  });
drumKit.tempoSlider.addEventListener('input', function(e) {
  drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function(e) {
  drumKit.updateTempo(e);
});
