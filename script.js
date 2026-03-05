const frames = [
"assets/hand1.png",
"assets/hand2.png",
"assets/hand3.png",
"assets/hand4.png",
"assets/hand5.png",
"assets/hand6.png"
]

const hand = document.getElementById("hand")

let frame = 0

function play(){

hand.src = frames[frame]

frame++

if(frame < frames.length){

setTimeout(play,120)

}else{

/* มือหาย */

hand.style.display = "none"

/* ปลดล็อก scroll */

document.body.style.overflow = "auto"

}

}

play()