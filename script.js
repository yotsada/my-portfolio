const frames = [
"assets/hand1.png",
"assets/hand2.png",
"assets/hand3.png",
"assets/hand4.png",
"assets/hand5.png"
]

const img = document.getElementById("hand")

window.addEventListener("scroll", () => {

const intro = document.querySelector(".intro")

const scrollTop = window.scrollY
const maxScroll = intro.offsetHeight - window.innerHeight

let progress = scrollTop / maxScroll
progress = Math.min(Math.max(progress,0),1)

const frameIndex = Math.floor(progress * (frames.length-1))

img.src = frames[frameIndex]

/* ซ่อนมือหลัง animation */

if(progress > 0.9){
img.style.opacity = "0"
}else{
img.style.opacity = "1"
}

})