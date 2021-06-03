let videoElem = document.querySelector("video");
// 1. 
let recordBtn = document.querySelector(".record");
let bgColor = document.querySelectorAll(".bg-color")
let filter = document.querySelector(".filter-overlay")

let clickBtn = document.querySelector(".click.round-btn");
let recordTimings = document.querySelector(".record-timings");
let clear;
let seconds = 0;



let isRecording = false;
// user  requirement send 
let constraint = {
    audio: true, video: true
}
// represent future recording
let recording = [];
let mediarecordingObjectForCurrStream;
// promise 
let usermediaPromise = navigator
    .mediaDevices.getUserMedia(constraint);
// /stream coming from required
usermediaPromise.
    then(function (stream) {
        // UI stream 
        videoElem.srcObject = stream;
        // browser
        mediarecordingObjectForCurrStream = new MediaRecorder(stream);
        // camera recording add -> recording array
        mediarecordingObjectForCurrStream.ondataavailable = function (e) {
            recording.push(e.data);
        }
        // download
        mediarecordingObjectForCurrStream.addEventListener("stop", function () {
            // recording -> url convert 
            // type -> MIME type (extension)
            const blob = new Blob(recording, { type: 'video/mp4' });
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement("a");
            a.download = "file.mp4";
            a.href = url;
            a.click();
            recording = [];
        })

    }).catch(function (err) {
        console.log(err)
        alert("please allow both microphone and camera");
    });
recordBtn.addEventListener("click", function () {
    if (mediarecordingObjectForCurrStream == undefined) {
        alert("First select the devices");
        return;
    }
    if (isRecording == false) {
        mediarecordingObjectForCurrStream.start();
        recordBtn.innerText = "Recording....";
        startTiming();
    }
    else {
        mediarecordingObjectForCurrStream.stop();
        recordBtn.innerText = "Record";
        stopTiming();
    }
    isRecording = !isRecording
})

let colorsArr=["#0080004a","#ff00002b","#ffa5002b","#8000803b","transparent"];
for (let index = 0; index < bgColor.length; index++) {
    bgColor[index].addEventListener("click",(e)=>{

        filter.style.backgroundColor = colorsArr[index];

      
      

    })
    
}

filter.style.backgroundColor = "transparent";
clickBtn.addEventListener("click",(e)=>{

    let canvas = document.createElement("canvas");
    canvas.height = videoElem.videoHeight;
    canvas.width = videoElem.videoWidth;

    let tool = canvas.getContext("2d");
    tool.drawImage(videoElem,0,0);
    // console.log(filter.style.backgroundColor);
    tool.fillStyle = filter.style.backgroundColor;
    tool.fillRect(0,0,canvas.width,canvas.height);
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.download = "file.png";
    a.href = url;
    a.click();
    a.remove();
    canvas.remove();

})

function  startTiming(){
    recordTimings.style.display = "block";

    function fun() {
        let sec = Number.parseInt(seconds%60);
        let minutes = Number.parseInt(seconds/60)%60;
        let hours = Number.parseInt(seconds/3600);
       
        recordTimings.innerText = `${hours<10?"0"+`${hours}`:hours}:${minutes<10?"0"+`${minutes}`:minutes}:${sec<10?"0"+`${sec}`:sec}`
        seconds++;
        
    }
    clear = setInterval(fun,1000);
}
function  stopTiming(){
    recordTimings.style.display = "none";

    clearInterval(clear);
}