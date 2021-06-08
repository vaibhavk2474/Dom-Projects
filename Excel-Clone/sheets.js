/* make add btn clickable and after click on add btn , new sheet will add*/
//10.  make active sheets 
//     10.1 when click on add sheet btn new sheet will add and new sheetDB will create
const btn = document.querySelector(".add-sheet_btn-container");
const sheetList = document.querySelector(".sheet-list");
const firstSheet = document.querySelector(".sheet");





//5.1.
// create a sheetDB array for storing for info obj for each cell
// now we set some default value for each menu options and when info of cell will change by menu option that change also changed in that cell's array im sheetDB
let sheetDBArr = [];
let sheetDB;
let sheetDBTemp = [];
// const rows = 100;
// const cols = 26;


btn.addEventListener("click",()=>{
    
//error 1->allSheets should get in event listener clall back function, not outside of if(think why?)
    let allSheets = document.querySelectorAll(".sheet");
    
    let NewSheet =  document.createElement("div");
   NewSheet.classList.add("sheet");
   let lastSheet =  allSheets[allSheets.length - 1];
   // console.log(allSheets);
   let lastSheetId =lastSheet.getAttribute("id");
   lastSheetId = Number(lastSheetId);
   NewSheet.setAttribute("id",`${lastSheetId+1}`);
   NewSheet.innerText=`Sheet ${lastSheetId+2}`;
   sheetList.appendChild(NewSheet);

   //task 2->make active only new sheet

   for (let i = 0; i < allSheets.length; i++) {
      allSheets[i].classList.remove("active");
       
   }
   NewSheet.classList.add("active");

   //10.1
   createNewSheeteDB();

   //10.3
   sheetDB = sheetDBArr[lastSheetId+1];
   // console.log(sheetDB);

   //10.4
   setUI();

   //10.5
let allCells = document.querySelectorAll(".grid .gridCell");
 for (let i = 0; i < allCells.length; i++) {
   allCells[i].click();
    
 }

 let cellOfCuurentSheet = document.querySelector(`[row="${0}"][col="${0}"]`)

 cellOfCuurentSheet.click();


   


   //task 3 -> add event listener
   //when click on newly created sheet then make active only it and all other will be non-active
   // here first sheet will  not be having this event listeener
   NewSheet.addEventListener("click",makeActiveSheet);

   // overflow auto focus last element
   NewSheet.scrollIntoView();




})

//this function makes current clicked sheet active
function makeActiveSheet(e) {

    let allSheets = document.querySelectorAll(".sheet");
    let sheet = e.target;
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
         
     }
     sheet.classList.add("active");
    let cId =  sheet.getAttribute("id");



   //10.1.1
    if (!sheetDBArr[cId]) {

      createNewSheeteDB();
       
    }

    //10.3.1
   sheetDB = sheetDBArr[cId];
   //10.4.1
   setUI();
   
  
  //10.5.1
 

   let allCells = document.querySelectorAll(".grid .gridCell");
 for (let i = 0; i < allCells.length; i++) {
   allCells[i].click();

   let cellOfCuurentSheet = document.querySelector(`[row="${0}"][col="${0}"]`)

   cellOfCuurentSheet.click();
    
 }

    
}

//task 4
//when click on first sheet then make active only it and all other will be non-active
firstSheet.addEventListener("click",makeActiveSheet);

//10.5
firstSheet.click();





//10.2
function createNewSheeteDB () {
   let NewDB = [] ;
   for (let i = 0; i < rows; i++) {
      let rowInSheetDB = [];
      for (let j = 0; j < cols; j++) {
        let cellOfSheetDB = {
          fontFamily: "sans-serif",
          fontSize: "16",
          bold: "normal",
          italic: "normal",
          underline: "none",
          hAlign: "center",
    
          color: "black",
          bgColor: "none",
    
          value: "",
          
          formula: "",
          children: [],
        };
        rowInSheetDB.push(cellOfSheetDB);
      }
      NewDB.push(rowInSheetDB);
    }



    sheetDBArr.push(NewDB);
}


function setUI() {
   
   for (let i = 0; i < rows; i++) {
  
      for (let j = 0; j < cols; j++) {
      
       let cellOfCuurentSheet = document.querySelector(`[row="${i}"][col="${j}"]`)

         cellOfCuurentSheet.innerText = sheetDB[i][j].value;

        }

}
}
