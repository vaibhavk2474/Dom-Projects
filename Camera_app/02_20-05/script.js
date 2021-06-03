/* start recording when click on record btn and again press this btn then a mp4 file is create and downloaded */
// get video element
let video = document.querySelector("video");
let recordbtn = document.querySelector(".record");

//get a promise which is resolvedwhen it get access of constraint otherwise reject
let promise = navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
});
let mediaRecorderObj;
let recordingArr = [];


//when we get stram then put on video element and mute audio of it

promise
  .then((stream) => {
    video.srcObject = stream;
    // video.muted = true;

    //create obj of MediaRecorder
    mediaRecorderObj = new MediaRecorder(stream);


    //when data available push data on array means record it
    //this fires when start() is called
    mediaRecorderObj.addEventListener("dataavailable", (e) => {
      recordingArr.push(e.data);
    });
    //when we stop() calls then create a file.mp4 and download it
    mediaRecorderObj.addEventListener("stop", (e) => {
      let blob = new Blob(recordingArr, { type: "video/mp4" });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.download = "file.mp4";
      a.href = url;
      a.click();
      recordingArr = [];
    });
  })
  .catch((err) => {
    console.error(err);
  });

  //abhi recording start nhi h
  let isRecording = false;




  //when press on record btn recording nwill start and again pressing it then stop being recorded
  recordbtn.addEventListener("click",(e)=>{
    
    //if stream is not gotten,then say on mic and camera
      if(mediaRecorderObj == undefined){
          alert("on mic and camera");
          return;
      }

      //record btn press karne k bad record start kar do ager nhi ho rhi thi tab
      if (isRecording == false) {
          mediaRecorderObj.start();
          recordbtn.innerText = `recording...`;

          //recording ho rhi h
          isRecording = true;
          
      } else {
      //record btn press karne k bad recording  karna band do  agar

        mediaRecorderObj.stop();
        recordbtn.innerText = `record`;
        //recording band ho gyi h
        isRecording = false;
        
          
      }

  })