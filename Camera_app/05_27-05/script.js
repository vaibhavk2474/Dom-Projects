const video = document.querySelector("video");
const videoContainer = document.querySelector(".video-container");
const recordBtn = document.querySelector(".record-btn");
const clickBtn = document.querySelector(".click-btn");
const ZoomInBtn = document.querySelector(".zoom-in-btn");
const ZoomOutBtn = document.querySelector(".zoom-out-btn");
const exampleDiv = document.querySelector(".example-div");
// error:- i was taking .filter-color  but i should take .filter
const filterColor = document.querySelectorAll(".filter");
const filterOverlay = document.querySelector(".filter-overlay");
const timer = document.querySelector(".timer");
let colorOfImg = "transparent"
let seconds = 0;
let token;








let isRecording = false;
let isClicked = false;

let mediaRecorderObj;
let recordingDataArr = [];

// a1.1
const constraints = {
    audio:true,
    video:true
} 

// A1.1 get video element and put stream on it
const mediaPromise = navigator.mediaDevices.getUserMedia(constraints);

mediaPromise.then((stream)=>{

    video.srcObject = stream;
   
     mediaRecorderObj = new MediaRecorder(stream);

     mediaRecorderObj.addEventListener("dataavailable",(e)=>{
 
      recordingDataArr.push(e.data);
     })
     mediaRecorderObj.addEventListener("stop",()=>{
      
        let blob = new Blob(recordingDataArr,{type:'video/mp4'});
        // let url = window.URL.createObjectURL(blob);

        // let a = document.createElement("a");
        // a.download = 'file.mp4';
        // a.href = blob;
        // a.click();
        // a.remove();
        addMediaToDatabase(blob,"video")

        recordingDataArr= [];
     })
}).catch((err)=>{

    console.log(err);

})


//b1.1 make active record btn
recordBtn.addEventListener("click",()=>{

    if (isRecording == false) {
        mediaRecorderObj.start();
        recordBtn.classList.add("animation-shrinkInOut");
        recordBtn.innerHTML='<i class="fas fa-stop"></i>';
        startTiming();
        isRecording=true;
        video.style.transform =`scale(${1})`
        filterOverlay.style.display="none"

        
    } else {
        mediaRecorderObj.stop();
        recordBtn.classList.remove("animation-shrinkInOut");
        recordBtn.innerHTML='<i class="fas fa-video"></i>';
        stopTiming();
        isRecording=false;
        video.style.transform =`scale(${scale})`
        filterOverlay.style.display="block"


        
    }

})

//b1.2make active click btn
clickBtn.addEventListener("click",()=>{
    if (isClicked == false) {
        clickBtn.style.animation = "shrinkInOut 1 1s"
        isClicked=true;

        
    } else {
       
        clickBtn.style.animation = ""
        isClicked=false;


        
    }
})
let canvas  = document.createElement("canvas");

//when click on on img btn photo clicked
clickBtn.addEventListener("click",()=>{

   
    // canvas.style.border = "1px solid black"
    // videoContainer.appendChild(canvas);
    let tool = canvas.getContext("2d");
    canvas.height = video.videoHeight;
    canvas.width = video.videoWidth


    tool.scale(scale, scale);
    const x = (tool.canvas.width / scale - video.videoWidth) / 2;
    const y = (tool.canvas.height / scale - video.videoHeight) / 2;
    console.log(x, y);

    
    tool.drawImage(video,x, y);
    tool.fillStyle = colorOfImg;
    tool.fillRect(x,y,canvas.width,canvas.height);
    
    let url = canvas.toDataURL();


    addMediaToDatabase(url,"img")
    // let a = document.createElement("a");
    // a.download = 'file.png';
    // a.href = url;
    // a.click();
    
    exampleDiv.appendChild(canvas);
    exampleDiv.style.animation = "shrinkInOut 1s  "
    setTimeout(()=>{
    exampleDiv.style.animation = "none  "

        canvas.remove();
    },1000)
   


    // a.remove();
//    canvas.remove();

// canvas.remove();

})


//zoom
let minScale = 1;
let maxScale = 1.7;
let scale=1;
ZoomInBtn.addEventListener("click",(e)=>{


    if (scale > minScale) {
        scale = scale-0.1
        video.style.transform = `scale(${scale})`;
    } 
})


ZoomOutBtn.addEventListener("click",(e)=>{


    if (scale < maxScale) {
        scale = scale+0.1
        video.style.transform = `scale(${scale})`;
    } 
})


//c1
let colorArr = [" #f3e5f54a","#a5d6a73d","#ad5d6d7a","#2195f323","transparent"];
for(let i=0; i<filterColor.length;i++){
    filterColor[i].addEventListener("click",(e)=>{
    
        colorOfImg = colorArr[i];
        filterOverlay.style.backgroundColor = colorOfImg;
    })
}








function startTiming() {

    timer.style.display = "block";


    fn = ()=>{
        
        let hours = Number.parseInt(Number.parseInt(seconds)/3600)
        let minutes = Number.parseInt(Number.parseInt(seconds)/60)%60;
        let sec = Number.parseInt(Number.parseInt(seconds)%60);

        timer.innerText = `${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`;
        seconds++;
    
    }
    
  token =  setInterval(fn,1000);
    
}

function stopTiming() {

    timer.style.display = "none";
    setTimeout(()=>{
        clearInterval(token)
    },1000)
    seconds = 0;
    
   
    
}