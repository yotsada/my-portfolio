const frames = [
  "assets/hand1.png",
  "assets/hand2.png",
  "assets/hand3.png",
  "assets/hand4.png",
  "assets/hand5.png",
  "assets/hand6.png"
];

const hand = document.getElementById("hand");

let progress = 0;
let finished = false;

window.addEventListener("wheel",(e)=>{

  if(finished) return;

  progress += e.deltaY * 0.001;

  progress = Math.max(0, Math.min(1, progress));

  const frameIndex = Math.floor(progress * (frames.length - 1));

  hand.src = frames[frameIndex];

  if(progress >= 1){
    hand.style.display = "none";
    document.body.style.overflow = "auto";
    finished = true;
  }

});