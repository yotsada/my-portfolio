const frames = [
"assets/hand1.png",
"assets/hand2.png",
"assets/hand3.png",
"assets/hand4.png",
"assets/hand5.png",
"assets/hand6.png"
]

const hand = document.getElementById("hand")

let progress = 0
let finished = false
let touchStart = 0

function updateFrame(){

const frameIndex = Math.floor(progress * (frames.length-1))
hand.src = frames[frameIndex]

if(progress >= 1){
hand.style.display = "none"
document.body.style.overflow = "auto"
finished = true
}

}

/* scroll สำหรับคอม */

window.addEventListener("wheel",(e)=>{

if(finished) return

progress += e.deltaY * 0.002

progress = Math.max(0,Math.min(1,progress))

updateFrame()

})

/* touch สำหรับมือถือ */

window.addEventListener("touchstart",(e)=>{

touchStart = e.touches[0].clientY

})

window.addEventListener("touchmove",(e)=>{

if(finished) return

const touchY = e.touches[0].clientY
const delta = touchStart - touchY

progress += delta * 0.003

progress = Math.max(0,Math.min(1,progress))

updateFrame()

touchStart = touchY

})

/* สำหรับชี้ปุ่ม */

const button = document.querySelector(".myButton")

button.addEventListener("mouseenter",()=>{
    hand.style.top = "40%"
    hand.style.right= "35%"
})

button.addEventListener("mouseleave",()=>{
    hand.style.top = "20%"
    hand.style.right = "-300px"
})