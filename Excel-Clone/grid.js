/* we make top-row,left-col and grid(100*26)*/
const leftBox = document.querySelector(".left_box");
const topRow = document.querySelector(".top_row")
const leftCol = document.querySelector(".left_col");
const grid = document.querySelector(".grid");
const rows = 100;
const cols = 26;



for (let i = 0; i < cols; i++) {
   let cell =  document.createElement("div");
  cell.setAttribute("class","rowCell");

  cell.innerText=`${String.fromCharCode(65 + i)}`
   topRow.appendChild(cell);

    
}


for (let i = 0; i < rows; i++) {
   let box =  document.createElement("div");
   box.setAttribute("class","box");
   
   box.innerText = `${i+1}`;
   // console.log(box);
   leftCol.appendChild(box);
 
     
 }

 for (let i = 0; i < rows; i++) {

    let gridRowCell = document.createElement("div");
    gridRowCell.setAttribute("class","row");


     for (let j = 0; j < cols; j++) {

        let gridCell = document.createElement("div");
        //add gridCell
        gridCell.setAttribute("class","gridCell");
        
        //make every grid cell editable
        gridCell.setAttribute("contenteditable","true");

        //put i(row), j(col) value on cell
        gridCell.setAttribute("row",i);
        gridCell.setAttribute("col",j);

        gridRowCell.appendChild(gridCell);
       

    }

    grid.appendChild(gridRowCell);
     
 }
     
 