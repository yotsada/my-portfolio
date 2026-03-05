const frames = [
"assets/hand1.png",
"assets/hand2.png",
"assets/hand3.png",
"assets/hand4.png",
"assets/hand5.png",
"assets/hand6.png"
]

const img = document.getElementById("hand")

window.addEventListener("scroll", () => {

const intro = document.querySelector(".intro")

const scroll = window.scrollY
const max = intro.offsetHeight - window.innerHeight

let progress = scroll / max

progress = Math.min(Math.max(progress,0),1)

const frame = Math.floor(progress * (frames.length - 1))

img.src = frames[frame]

})