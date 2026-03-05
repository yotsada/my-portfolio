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
let animationFinished = false

window.addEventListener("wheel",(e)=>{

if(animationFinished) return

if(e.deltaY > 0){

frame++

if(frame < frames.length){

hand.src = frames[frame]

}else{

hand.style.display = "none"
document.body.style.overflow = "auto"
animationFinished = true

}

}

})