//a1  upload data into indexDb
let request = indexedDB.open("camera",1);
let db;

// a1.1
request.onsuccess = function () {
    db = request.result;
}

// a1.2
request.onerror= function () {
    
    console.log("error");
}
// a1.3
request.onupgradeneeded = function () {
    
    db = request.result;
    db.createObjectStore("gallery",{keyPath:"mId",autoIncrement:true});
}


//a1.4

function addMediaToDatabase(data,type) {

    let txn = db.transaction("gallery","readwrite");
    let gallery = txn.objectStore("gallery");
    gallery.add({
        mId : Date.now(),
        type,
        media:data
    })
   
}






//b1 view data on gallery page from database
let c1 =0;
function viewOnGalleryPage() {
    
    const body = document.querySelector("body");
    let txn = db.transaction("gallery","readonly");
    let gallery = txn.objectStore("gallery");
    let req = gallery.openCursor();
    req.onsuccess = (e)=> {
        
      let cursor =   req.result;
      if (cursor) {
          console.log(c1++);
        if (cursor.value.type == "video") {

            let mediaContainer = document.createElement("div");
            mediaContainer.setAttribute("data-Id",cursor.value.mId)

            mediaContainer.classList.add("media-container");

            let video = document.createElement("video");
            video.autoplay= "true";
            video.muted= "true";
            video.loop= "true";


          
          
            let url = window.URL.createObjectURL(cursor.value.media)
            video.src = url;
            

             
            let deleteBtn = document.createElement("div");
            deleteBtn.innerText="Delete";

            deleteBtn.classList.add("delete-btn")
            let downloadBtn = document.createElement("div");

            downloadBtn.classList.add("download-btn");
            downloadBtn.innerText="Download";
            mediaContainer.appendChild(video)
            mediaContainer.appendChild(deleteBtn)
            deleteBtn.addEventListener("click",handleDeleting);
            mediaContainer.appendChild(downloadBtn);
            downloadBtn.addEventListener("click",handleDownloading);
            body.appendChild(mediaContainer);


            
             




        } else {
            let mediaContainer = document.createElement("div");

            mediaContainer.classList.add("media-container");
            mediaContainer.setAttribute("data-Id",cursor.value.mId)

            let img = document.createElement("img");
            img.src = cursor.value.media;
            img.classList.add("img");
            

             
            let deleteBtn = document.createElement("div");
            deleteBtn.classList.add("delete-btn")
            deleteBtn.innerText="Delete";

            let downloadBtn = document.createElement("div");

            downloadBtn.classList.add("download-btn")
            downloadBtn.innerText="Download";

            mediaContainer.appendChild(img)
            mediaContainer.appendChild(deleteBtn)
            downloadBtn.addEventListener("click",handleDownloading);

            deleteBtn.addEventListener("click",handleDeleting);
            mediaContainer.appendChild(downloadBtn);
            mediaContainer.appendChild(downloadBtn)
            body.appendChild(mediaContainer);
        }


        cursor.continue();
          
      }

    }


c1=0;
}


function handleDownloading(e) {

    let dataId = e.target.parentNode.getAttribute("data-Id");

    let givenElementIs = e.target.parentNode.children[0].tagName;

    if (givenElementIs == "IMG") {
        let a = document.createElement("a");
        let url = e.target.parentNode.children[0].src;
        // console.log(url);
        a.href = url;
        a.download = "file.png";
        a.click();
        a.remove();

        
    }else{
        let a = document.createElement("a");
        let blob = e.target.parentNode.children[0].src;
        // let url  = window.URL.createObjectURL(blob);
        // console.log(url);
        a.href = blob;
        a.download = "file.mp4";
        a.click();
        a.remove();


    }

    
}

function deleteFromDatabase (dataId) {
    
    let tnx = db.transaction("gallery","readwrite");

    let gallery = tnx.objectStore("gallery");







    gallery.delete(Number(dataId))
    console.log( typeof dataId);//string
}

function handleDeleting(e) {
    let dataId = e.target.parentNode.getAttribute("data-Id");

    let givenElementIs= e.target.parentNode.children[0].tagName;
    
    if (givenElementIs == "IMG") {
        console.log(dataId);
        deleteFromDatabase(dataId);
      

        e.target.parentNode.remove();
    }else{
        console.log(dataId);
        deleteFromDatabase(dataId);
        e.target.parentNode.remove();


    }
     
 }