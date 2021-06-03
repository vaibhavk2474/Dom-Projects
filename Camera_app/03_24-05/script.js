const video = document.querySelector("video");


const recordBtn = document.querySelector(".record-btn");



//1. get access of camera and mic;
const mediaPromise = navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true,
});

//error-> 1. if we make mediaRecorderObj const then we have to gaive it initialise value so muse let here;
let mediaRecorderObj;
let recordingArr = [];

//2.if promise resolve then()
mediaPromise.then((stream)=>{

    video.srcObject = stream;

    mediaRecorderObj = new MediaRecorder(stream);




    


    //calling start(),this event fires
    mediaRecorderObj.addEventListener("dataavailable",(e)=>{

        recordingArr.push(e.data);
    });

    //jab tak record btn on rhega above event chalta rhega aur data arr m push hota rhega ab jab record btn off krenge tab
    //jake below event fire hoga aur arr m record hona band hoga

    //calling stop(), this event
    // mediaRecorderObj.addEventListener("stop",(e)=>{

    //    console.log("video recording closed");
    // });


    // so stop() call hone k bad below event fire hoga ab jo bhi arr m pada h use hum download krenge;
    mediaRecorderObj.addEventListener("stop",(e)=>{

        let blob = new Blob(recordingArr,{type:'video/mp4'});

        let url = window.URL.createObjectURL(blob);



       let a = document.createElement("a");
       a.download = "file.mp4";
       a.href = url;
       a.click();
       //make empty the recordingArr
       recordingArr = []; 

      });
}).catch((err)=>{
    console.log(err);
})






// 3.make active record-btn

//recording nhi ho rhi
let isRecording = false;

recordBtn.addEventListener("click",(e)=>{

    //if recording nhi ho rhi means isRecording == false;
    if (isRecording == false) {

        mediaRecorderObj.start();
        recordBtn.innerText = `recording...`;
        isRecording = true;

        
    } else {
    //if recording ho rhi means isRecording == true;
        mediaRecorderObj.stop();
        recordBtn.innerText = `record`;
        isRecording = false;
    }
})