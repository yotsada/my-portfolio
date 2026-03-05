const frames = [
  "assets/hand1.png",
  "assets/hand2.png",
  "assets/hand3.png",
  "assets/hand4.png",
  "assets/hand5.png",
  "assets/hand6.png"
];

const img = document.getElementById("hand");
let frame = 0;

function playAnimation(){
  img.src = frames[frame];
  frame++;

  if(frame < frames.length){
    setTimeout(playAnimation, 120);  // ความเร็ว animation
  }else{
    img.style.display = "none";      // มือหาย
    document.body.style.overflow = "auto";  // ปลดล็อก scroll
  }
}

playAnimation();