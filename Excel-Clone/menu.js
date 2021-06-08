/* make active font-family */
const fontFamily = document.querySelector(".font-family");
const fontSize = document.querySelector(".font-size");
const buiContainer = document.querySelector(".bui-container");
const alignContainer = document.querySelector(".align-container");

//task 1. sabse phle fontFamily par ek event lagayenge jo font-family change krne par fire hoga
//uske bad function UICurrentCellAddressFromInputAddress() se current cell ka row col get krenge
// aur row,col se current clicked cell ka div element nikal kar font-family change karenge

// task 2. change fontSize like fontFamily

// task 3. now we will add event to bui' children

// task 4. change textAlign like fontFamily

//task 5. ab humne sab set kar diya bold btn par click honr par text bold hoga ,left karne par textAlign left hoga
// ab hum chahte ki agar text phle se bold ho to bold btn click karne par  boldness remove ho
// to iske liye cell ki sari info hum store krenge

//task 6. now using sheetDB we will add functionality to menu options that if we click menu options the effect shoud come on text and after again ckicking effect shoud be remove



//1.1
fontFamily.addEventListener("change", (e) => {
  let fontFamilyValue = fontFamily.value;

  let currentCellrowAndCol = UICurrentCellAddressFromInputAddress();
  // console.log(currentCellAddress);

  //now get addres

  let col = currentCellrowAndCol.col;
  let row = currentCellrowAndCol.row;

  let currentCell = document.querySelector(`[row="${row}"][col="${col}"]`);

  //5.2
  // console.log(currentCell);
  currentCellInSheetDB = sheetDB[row][col];
  // console.log(currentCellInSheetDB);
  currentCellInSheetDB.fontFamily = fontFamilyValue;
  // console.log( currentCellInSheetDB.fontFamily);

  currentCell.style.fontFamily = fontFamilyValue;
});

// let addressInput = document.querySelector(".address-input");

//1.2 create a function to get row col from address-Input
function UICurrentCellAddressFromInputAddress() {
  let currentCellAddress = addressInput.value;

  let colAlphbet = currentCellAddress.charAt(0);
  let rowNumber = currentCellAddress.charAt(1);

  let col = colAlphbet.charCodeAt(0) - 65;
  let row = rowNumber - 1;

  return {
    col: col,
    row: row,
  };
}

//task 2.

fontSize.addEventListener("change", (e) => {
  let fontSizeValue = fontSize.value;

  let currentCellrowAndCol = UICurrentCellAddressFromInputAddress();
  // console.log(currentCellAddress);

  //now get addres

  let col = currentCellrowAndCol.col;
  let row = currentCellrowAndCol.row;

  let currentCell = document.querySelector(`[row="${row}"][col="${col}"]`);

  //5.3
  currentCellInSheetDB = sheetDB[row][col];
  //  console.log(currentCellInSheetDB);
  currentCellInSheetDB.fontSize = fontSizeValue; //+ "px";//
   console.log( currentCellInSheetDB.fontSize);
  //  console.log(currentCell);
  //err->"px" likhna bool gya tha to work nhi kar rha tha below line

  currentCell.style.fontSize = fontSizeValue + "px";
});

//task 3
for (let i = 0; i < buiContainer.children.length; i++) {
  buiContainer.children[i].addEventListener("click", (e) => {
    // console.log(e.target);

    let value = e.target.getAttribute("class");
    //   console.log(value);

    let { col, row } = UICurrentCellAddressFromInputAddress();

    let currentCell = document.querySelector(`[row="${row}"][col="${col}"]`);
    currentCellInSheetDB = sheetDB[row][col];
    console.log(currentCellInSheetDB);

    if (value == "bold") {

      if (currentCellInSheetDB.bold == "normal") {
        //5.3

        currentCellInSheetDB.bold = value;
        console.log(currentCellInSheetDB.bold);
        e.target.style.backgroundColor = "green";

      

        currentCell.style.fontWeight = value;
      } else {
         e.target.style.backgroundColor = "white";
       


        currentCellInSheetDB.bold = "normal";
        console.log(currentCellInSheetDB.bold);

        currentCell.style.fontWeight = "normal";
      }

    } else if (value == "underline") {
      //5.3

      if (currentCellInSheetDB.underline == "none") {

        e.target.style.backgroundColor = "green";

        currentCellInSheetDB.underline = value;
        console.log(currentCellInSheetDB.underline);
        currentCell.style.textDecoration = value;
      } else {
        e.target.style.backgroundColor = "white";

        currentCellInSheetDB.underline = "none";
        console.log(currentCellInSheetDB.underline);
        currentCell.style.textDecoration = "none";
      }
    } else if (value == "italic") {
      //5.3

      if (currentCellInSheetDB.italic == "normal") {

        e.target.style.backgroundColor = "green";

        currentCellInSheetDB.italic = value;
        console.log(currentCellInSheetDB.italic);
        currentCell.style.fontStyle = value;
      } else {

        e.target.style.backgroundColor = "white";

        currentCellInSheetDB.italic = "normal";
        console.log(currentCellInSheetDB.italic);
        currentCell.style.fontStyle = "normal";
      }
    }
  });
}

//task 4

for (let i = 0; i < alignContainer.children.length; i++) {
  alignContainer.children[i].addEventListener("click", (e) => {
    // console.log(e.target);

    let value = e.target.getAttribute("class");
    //   console.log(value);

    let { col, row } = UICurrentCellAddressFromInputAddress();

    let currentCell = document.querySelector(`[row="${row}"][col="${col}"]`);
    //   console.log(currentCell);

    currentCellInSheetDB = sheetDB[row][col];
    console.log(currentCellInSheetDB);

    if (value == "left") {
      //5.3

      alignContainer.children[1].style.backgroundColor = "white";

      alignContainer.children[0].style.backgroundColor = "green";
      alignContainer.children[2].style.backgroundColor = "white";



        currentCellInSheetDB.hAlign = value;
        // console.log(currentCellInSheetDB.hAlign);
        currentCell.style.textAlign = value;



    } else if (value == "center") {

      // e.target.style.backgroundColor = "green";
      
      alignContainer.children[1].style.backgroundColor = "green";

      alignContainer.children[0].style.backgroundColor = "white";
      alignContainer.children[2].style.backgroundColor = "white";

  
        currentCellInSheetDB.hAlign = value;
        // console.log(currentCellInSheetDB.hAlign);

        currentCell.style.textAlign = value;
 

    } else if (value == "right") {
      //5.3


      // e.target.style.backgroundColor = "green";
      alignContainer.children[1].style.backgroundColor = "white";

      alignContainer.children[0].style.backgroundColor = "white";
      alignContainer.children[2].style.backgroundColor = "green";

        currentCellInSheetDB.hAlign = value;
        // console.log(currentCellInSheetDB.hAlign);

        currentCell.style.textAlign = value;

    }
  });
}
