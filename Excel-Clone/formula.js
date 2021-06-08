/* first make active the address-input,so whenever we click on any cell ,this cell address will be shown in address-input*/

let addressInput = document.querySelector(".address-input");
let allCells = document.querySelectorAll(".grid .gridCell");



/* 8.  now add formulas  */
/* 9.  now add children into respective cells*/


//8.1
let formulaInput = document.querySelector(".formula-input");
formulaInput.placeholder = `formula`;

// 7.  put each cell value in cell's position of sheetDB


for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("click",(e)=>{

    //get row and col of current clicked cell
       let currentCell = e.target;
       let r = currentCell.getAttribute("row");
       let c = currentCell.getAttribute("col");
       row = Number(r)+1;
       col = Number(c)+0;
    //    console.log(r,c);

    //put the value of clicked cell into address-input
    //use String.fromCharCode();
    addressInput.value =`${String.fromCharCode(65+col)}${row}`;


    



    //6.1 
     let cellOfSheetDB = sheetDB[Number(r)][Number(c)];
     console.log(cellOfSheetDB.fontSize);
     
 


     //6.2
      e.target.style.fontFamily = cellOfSheetDB.fontFamily;
      fontFamily.value =  cellOfSheetDB.fontFamily;

      e.target.style.fontSize =cellOfSheetDB.fontSize;
      fontSize.value = cellOfSheetDB.fontSize;

      for (let i = 0; i < buiContainer.children.length; i++) {
          
        if (cellOfSheetDB.bold == "bold") {
            buiContainer.children[0].style.backgroundColor = "green";
            e.target.style.fontWeight = "bold";
        } else {
            buiContainer.children[0].style.backgroundColor = "white";
            e.target.style.fontWeight = "normal";
           
            
        }

        if (cellOfSheetDB.underline == "underline") {
            buiContainer.children[1].style.backgroundColor = "green";
            e.target.style.textDecoration = "underline";
        } else {
            buiContainer.children[1].style.backgroundColor = "white";
            e.target.style.textDecoration = "none";
           
            
        }

        if (cellOfSheetDB.italic == "italic") {
            buiContainer.children[2].style.backgroundColor = "green";
            e.target.style.fontStyle = "italic";
        } else {
            buiContainer.children[2].style.backgroundColor = "white";
            e.target.style.fontStyle = "normal";
           
            
        }
          
      }



      for (let i = 0; i < alignContainer.children.length; i++) {
          
        if (cellOfSheetDB.hAlign == "left") {
            alignContainer.children[0].style.backgroundColor = "green";
            alignContainer.children[1].style.backgroundColor = "white";
            alignContainer.children[2].style.backgroundColor = "white";

            console.log(e.target.style.textAlign);
            e.target.style.textAlign = "left";
        }
        if (cellOfSheetDB.hAlign == "center") {
            // alignContainer.children[1].style.backgroundColor = "green";
            alignContainer.children[0].style.backgroundColor = "white";
            alignContainer.children[1].style.backgroundColor = "green";
            alignContainer.children[2].style.backgroundColor = "white";
            e.target.style.textAlign = "center";
        }
        if (cellOfSheetDB.hAlign == "right") {
            alignContainer.children[0].style.backgroundColor = "white";
            alignContainer.children[1].style.backgroundColor = "white";
            alignContainer.children[2].style.backgroundColor = "green";

            e.target.style.textAlign = "right";
        }

      }



      //8.4.1 and 6.3
      //put formula of current cell on formulaInput

     formulaInput.value =  cellOfSheetDB.formula;





    })
    
}


//when user type any gridCell nunber then that cell will be in focus
// addressInput.addEventListener("keydown", (e) => {
//   if (e.key == "Enter") {
//     let valueOfaddressInput = addressInput.value;

//     // console.log(typeof valueOfaddressInput);

//     // get col number
//     //use charAt() and charCodeAt()
//     let col = valueOfaddressInput.charCodeAt(0); //0
//     let r = valueOfaddressInput.charAt(1);
//     let row = Number(r); //0

//     console.log(row, col);

//     let cellNumber = (row - 1) * 26 + (col - 65);
//     console.log(cellNumber);

//     allCells[cellNumber].style.border = "2px solid red";

//     allCells[cellNumber].focus();
//     console.log(allCells[cellNumber]);

//     // allCells[cellNumber].style.textAlign = "center"
//   }
// });



//8.1
formulaInput.addEventListener("keydown", (e)=>{

  if (e.key == "Enter" && e.target.value != "" ) {
    //   console.log(e.target.value);
    let formulaInputValue = e.target.value;
    // ( A1 + A2 );  //take formula space seprated so that we can split it
    // console.log(typeof formulaInputValue);//string
    let formulaInputValueIntoArr =  formulaInputValue.split(" ");
    //["(","A1","+","A2",")"]
    // console.log(formulaInputValueIntoArr);
    // console.log(formulaInputValueIntoArr);

    //remove spaces and empty strings in arr
    // ["(","A1","+","A2","","","",")"] to  ["(","A1","+","A2",")"]
    formulaInputValueIntoArr = formulaInputValueIntoArr.filter((e)=>{
        return  e != "";
    })
    


    // console.log(formulaInputValueIntoArr);
  
    let  formulaInputValueInIntFor = converTextExpressionToValueExpression(formulaInputValueIntoArr);

    // console.log(formulaInputValueInIntFor);

    formulaInputValueInIntFor =  formulaInputValueInIntFor.join(" ");//( 4 + 5 )

    
    
    let calculatedValue = eval(formulaInputValueInIntFor);
    
    // console.log(calculatedValue);
    
    
    
    //8.3
    
    let currentCellrowAndCol =  UICurrentCellAddressFromInputAddress();
    console.log(currentCellrowAndCol);
    
    let col = currentCellrowAndCol.col;
    let row = currentCellrowAndCol.row;
    
    let currentCell = document.querySelector(`[row="${row}"][col="${col}"]`);
    
    //current cell me evaluated value shoe krayenge 
    //par calculated value int h aur hum string put krate aye h
    currentCell.innerText =  calculatedValue+"";
    

    //sheetDB k cell obj m value update krenge
    currentCellInSheetDB = sheetDB[row][col];
    currentCellInSheetDB.value = calculatedValue + "";
    
    
    //8.4 put formula in cell obj 's formula in sheetDB
    
    currentCellInSheetDB.formula = formulaInputValue;

    setChidrenIntoRepctiveCells(formulaInputValue,currentCellrowAndCol);
    
    
    
    
}
})

//7.1
for (let i = 0; i < allCells.length; i++) {
    
    allCells[i].addEventListener("blur",(e )=>{
        let currentCell = e.target;
        let r = currentCell.getAttribute("row");
        let c = currentCell.getAttribute("col");
        
        let cellOfSheetDB = sheetDB[Number(r)][Number(c)];
        // console.log(cellOfSheetDB.fontSize);
        
        
        
        let cellInnerValueOrText =  e.target.valueOf().innerText;

        if (cellInnerValueOrText ==  cellOfSheetDB.value) {
            cellOfSheetDB.value = cellInnerValueOrText;
            e.target.innerText = cellInnerValueOrText;
            
            return;
            
        }
       
        if (cellInnerValueOrText !=  cellOfSheetDB.value) {
            cellOfSheetDB.value = cellInnerValueOrText;
            e.target.innerText = cellInnerValueOrText;
             //8.4.2
      //change value if changed value related cell
           
           cellOfSheetDB.formula = "";
       updateChildren(cellOfSheetDB);


            return;
            
        }



        
     



    })
    
}

//8.4.3
function updateChildren(cellOfSheetDB) {
    // console.log(cellOfSheetDB.children);

    for (let i = 0; i < cellOfSheetDB.children.length; i++) {
        
        let cell = cellOfSheetDB.children[i];
       let col =  cell.charAt(0).charCodeAt(0) -65;
       let row =  cell.charAt(1)-1;
       console.log(row,col);//C1 -> 1 C

      let currentCellInDB =  sheetDB[row][col];
      let currentCellForUI = document.querySelector(`[row="${row }"][col="${col}"]`)
    //   console.log(currentCellForUI);

console.log(currentCellInDB.formula);
     let formulaInputValue =  currentCellInDB.formula;
     if (!formulaInputValue) {
         return;
     }
    let formulaInputValueIntoArr =  formulaInputValue.split(" ");
    formulaInputValueIntoArr = formulaInputValueIntoArr.filter((e)=>{
        return  e != "";
    })

  let exp =  converTextExpressionToValueExpression(formulaInputValueIntoArr);

     currentCellInDB.value= eval(exp.join(" "));
     currentCellForUI.innerText = currentCellInDB.value;
     
 

    }
    
}



//8.2

function converTextExpressionToValueExpression(textExpressionArr){
    
    
    for (let i = 0; i < textExpressionArr.length; i++) {
        if (Number(textExpressionArr[i])) {
            continue;
            
        }
        
        if (textExpressionArr[i] == " " || textExpressionArr[i] == "(" || textExpressionArr[i] == ")" || textExpressionArr[i] == "+" || textExpressionArr[i] == "-" || textExpressionArr[i] == "*" || textExpressionArr[i] == "/") {
            continue;
            
        } else if((textExpressionArr[i] >= 0 && textExpressionArr[i] <= 99) || (textExpressionArr[i]>="A" && textExpressionArr[i]<="Z")) {
           console.log("textExp");
            console.log( textExpressionArr[i]);
            
            let colAlphabetString =  textExpressionArr[i].charAt(0);
            let rowSting =  textExpressionArr[i].charAt(1);
            
            let r = Number(rowSting);
            let c = colAlphabetString;
            
            let row = r-1;
            let col = c.charCodeAt(0) - 65;
            
            console.log(row, col);
            
           let cellValueInString =  sheetDB[row][col].value;

           textExpressionArr[i] = Number(cellValueInString);

            
        }
        
    }
    valueExpressionArr = textExpressionArr;

    return valueExpressionArr;
    
}

//8.4.1
function setChidrenIntoRepctiveCells(expression, currentCellrowAndCol) {

    console.log(expression);
    console.log(currentCellrowAndCol);

    //currentCellrowAndCol 0,2
    //row, col
    let rw = currentCellrowAndCol.row+1;
    let cl = String.fromCharCode(currentCellrowAndCol.col+65);
    console.log(rw,cl);



    let splitedWithSpaceExpArr = expression.split(" ");
    
    //arr can have empty strings remove them
    
    splitedWithSpaceExpArr = splitedWithSpaceExpArr.filter((e)=>{
        return e != "";
    })
    console.log(splitedWithSpaceExpArr);





    for (let i = 0; i < splitedWithSpaceExpArr.length; i++) {

        if (Number(splitedWithSpaceExpArr[i])) {
            continue;
            
        }
       
        if (splitedWithSpaceExpArr[i] == " " || splitedWithSpaceExpArr[i] == "(" || splitedWithSpaceExpArr[i] == ")" || splitedWithSpaceExpArr[i] == "+" || splitedWithSpaceExpArr[i] == "-" || splitedWithSpaceExpArr[i] == "*" || splitedWithSpaceExpArr[i] == "/") {
            continue;
            
        } else  {
        //  console.log(splitedWithSpaceExpArr[i]);
        
         let colAlphaString =  splitedWithSpaceExpArr[i].charAt(0);//A
         let rowString = splitedWithSpaceExpArr[i].charAt(1);//1

         
         let col = colAlphaString.charCodeAt(0) - 65;
         let row = Number(rowString) - 1;
         
         
         
         sheetDB[row][col].children.push(`${cl}${rw}`);
         
         console.log(currentCellrowAndCol);



            
        }
        
    }
}