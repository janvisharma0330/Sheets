let collectedSheetDb=[];
let sheetDB=[];

{
    let addSheetBtn=document.querySelector(".sheet-add-icon");
    addSheetBtn.click();
}
// for(let i=0;i<rows;i++)
// {
//     let sheetRow=[];
//     for(let j=0;j<col;j++)
//     {
//         let cellProp={
//             bold:false,
//             italic:false,
//             underlined:false,
//             alignment:"left",
//             fontFamily:"monospace",
//             fontSize:14,
//             color:"#000000",
//             bgColor:"#000000",
//             value:"" ,
//             formula:"",
//             children:[]
//         }
//         sheetRow.push(cellProp);
//     }
//     sheetDB.push(sheetRow);
// }
let bold=document.querySelector(".bold")
let alignment=document.querySelectorAll(".allignment");
let underlined=document.querySelector(".underlined");
let italic=document.querySelector(".italic");
let fontSize=document.querySelector(".font-size");
let fontFamily=document.querySelector(".font-family");
let fontColor=document.querySelector(".font-color");
let bgColor=document.querySelector(".bg-color");
let leftAlignment=alignment[0];
let centerAlignment=alignment[1];
let rightAlignment=alignment[2];
//Two-way-binding
// let addressbar=document.querySelector(".address-bar")
bold.addEventListener("click",(e)=>
{
    let addrs=addressbar.value;
    let [cell,cellprop]=activeCell(addrs);
    cellprop.bold= !cellprop.bold;
    if(cellprop.bold)
    {
        cell.style.fontWeight="bold";
        bold.style.backgroundColor="#d1d8e0";
    }
    else
    {
        cell.style.fontWeight="normal";
        bold.style.backgroundColor="#ecf0f1";        
    }
}) 
italic.addEventListener("click",(e)=>
{
    let addrs=addressbar.value;
    let [cell,cellprop]=activeCell(addrs);
    cellprop.italic= !cellprop.italic;
    if(cellprop.italic)
    {
        cell.style.fontStyle="italic";
        italic.style.backgroundColor="#d1d8e0";
    }
    else
    {
        cell.style.fontStyle="normal";
        italic.style.backgroundColor="#ecf0f1";        
    }
}) 
underlined.addEventListener("click",(e)=>
{
    let addrs=addressbar.value;
    let [cell,cellprop]=activeCell(addrs);
    cellprop.underlined= !cellprop.underlined;
    if(cellprop.underlined)
    {
        cell.style.textDecoration="underline";
        underlined.style.backgroundColor="#d1d8e0";
    }
    else
    {
        cell.style.textDecoration="none";
        underlined.style.backgroundColor="#ecf0f1";        
    }
}) 
fontSize.addEventListener("change",(e)=>
{
    let addrs=addressbar.value;
    let [cell,cellprop]=activeCell(addrs);
    cellprop.fontSize=fontSize.value;
    cell.style.fontSize=fontSize.value + "px";
}) 
fontFamily.addEventListener("change",(e)=>
{
    let addrs=addressbar.value;
    let [cell,cellprop]=activeCell(addrs);
    cellprop.fontFamily=fontFamily.value;
    cell.style.fontFamily=fontFamily.value;
}) 
fontColor.addEventListener("change",(e)=>
{
    let addrs=addressbar.value;
    let [cell,cellprop]=activeCell(addrs);
    cellprop.color=fontColor.value;
    cell.style.color=fontColor.value;
}) 
bgColor.addEventListener("change",(e)=>
{
    let addrs=addressbar.value;
    let [cell,cellprop]=activeCell(addrs);
    cellprop.bgColor=bgColor.value;
    cell.style.backgroundColor=bgColor.value;
}) 
alignment.forEach((alement) => {alement.addEventListener("click",(e)=>
{
    let addrs=addressbar.value;
    let [cell,cellprop]=activeCell(addrs);
    let alignmentvalue=e.target.classList[0];
    cellprop.alignment=alignmentvalue;
    cell.style.textAlign= alignmentvalue;
    switch(alignmentvalue)
    {
        case "left":
            leftAlignment.style.backgroundColor="#d1d8e0";
            centerAlignment.style.backgroundColor="#ecf0f1";
            rightAlignment.style.backgroundColor="#ecf0f1";
            break;
        case "center":
            centerAlignment.style.backgroundColor="#d1d8e0";
            leftAlignment.style.backgroundColor="#ecf0f1";
            rightAlignment.style.backgroundColor="#ecf0f1";
            break;    
        case "right":
            rightAlignment.style.backgroundColor="#d1d8e0";
            centerAlignment.style.backgroundColor="#ecf0f1";
            leftAlignment.style.backgroundColor="#ecf0f1";
            break;
    }   
})})
let allCells=document.querySelectorAll(".cell"); 
for(let i=0;i<allCells.length;i++)
{
    attachCellProperties(allCells[i]);
}
function attachCellProperties(cell)
{
   cell.addEventListener("click",(e)=>
   {
    let adrs=addressbar.value;
    let [rid,cid]=decode(adrs);
    let cellprop=sheetDB[rid][cid];
    if(cellprop.bold)
    {
        cell.style.fontWeight="bold";
        bold.style.backgroundColor="#d1d8e0";
    }
    else
    {
        cell.style.fontWeight="normal";
        bold.style.backgroundColor="#ecf0f1";        
    }
    if(cellprop.italic)
    {
        cell.style.fontStyle="italic";
        italic.style.backgroundColor="#d1d8e0";
    }
    else
    {
        cell.style.fontStyle="normal";
        italic.style.backgroundColor="#ecf0f1";        
    }
    if(cellprop.underlined)
    {
        cell.style.textDecoration="underline";
        underlined.style.backgroundColor="#d1d8e0";
    }
    else    
    {
        cell.style.textDecoration="none";
        underlined.style.backgroundColor="#ecf0f1";        
    }
    cell.style.fontSize=cellprop.fontSize+ "px";
    cell.style.color=cellprop.color;
    cell.style.fontFamily=cellprop.fontFamily;  
    cell.style.backgroundColor=cellprop.bgColor=== "#000000" ? "transparent" : cellProp.bgColor;
    cell.style.textAlign= cellprop.alignment;

    switch(cellprop.alignment)
    {
        case "left":
            leftAlignment.style.backgroundColor="#d1d8e0";
            centerAlignment.style.backgroundColor="#ecf0f1";
            rightAlignment.style.backgroundColor="#ecf0f1";
            break;
        case "center":
            centerAlignment.style.backgroundColor="#d1d8e0";
            leftAlignment.style.backgroundColor="#ecf0f1";
            rightAlignment.style.backgroundColor="#ecf0f1";
            break;    
        case "right":
            rightAlignment.style.backgroundColor="#d1d8e0";
            centerAlignment.style.backgroundColor="#ecf0f1";
            leftAlignment.style.backgroundColor="#ecf0f1";
            break;
    }
    //risky
    let formulaBar=document.querySelector(".formula-bar");
    formulaBar.value=cellprop.value;
    cell.innerText=cellprop.value;
   })
}

function activeCell(address)
{
 let [rowA,colA] = decode(address);
 let cell=document.querySelector(`.cell[rowid="${rowA}"][colid="${colA}"]`)
 let cellprop=sheetDB[rowA][colA];
 return [cell,cellprop];
}
function decode(address)
{
let rowid=Number(address.slice(1)-1);
let colid=Number(address.charCodeAt(0)) - 65;
return [rowid,colid];
}
