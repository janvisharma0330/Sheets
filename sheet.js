let addSheetBtn=document.querySelector(".sheet-add-icon");
let sheetFolderContainer=document.querySelector(".sheet-folder-cont");

addSheetBtn.addEventListener("click" , (e)=>
{
    let sheet=document.createElement("div");
    sheet.setAttribute("class","sheet-folder");
    let allSheetFolder=document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id",allSheetFolder.length);
    sheet.innerHTML= `<div class="sheet-content">Sheet ${allSheetFolder.length+1}</div>`;
    sheetFolderContainer.appendChild(sheet);
    createSheetDb();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    removeSheet(sheet);
    sheet.click();
})
function removeSheet(sheet)
{
    sheet.addEventListener("mousedown",(e)=>{
        if(e.button!=2) return;
        let allSheetFolder=document.querySelectorAll(".sheet-folder");
        if(allSheetFolder.length==1)
        {
            alert("You must have atleast 1 sheet");
            return;
        }
        let response=confirm("You want to permanently delete your sheet?");
        if(response===false) return;
        let idx=sheet.getAttribute("id");
        collectedSheetDb.splice(idx,1);
        collectedGraphComponent.splice(idx,1);
        handleSheetUiRemovel(sheet);
        sheetDB=collectedSheetDb[0];
        graphComponentMatrix=collectedGraphComponent[0];
        handleSheetProperties();
    })
}
function handleSheetUiRemovel(sheet)
{
    sheet.remove();
    let allSheetFolder=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolder.length;i++)
    {
        allSheetFolder[i].setAttribute("id", i);
        let sheetContent=allSheetFolder[i].querySelector(".sheet-content");
        sheetContent.innerText=`Sheet ${i+1}`;
        allSheetFolder[i].style.backgroundColor="transparent";
    }
    allSheetFolder[0].style.backgroundColor="#ced6e0";
}
function handleSheetDb(sheetidx)
{
    sheetDB=collectedSheetDb[sheetidx];
}
function handleGraphDb(sheetidx)
{
    graphComponentMatrix=collectedGraphComponent[sheetidx];
}
function handleSheetProperties()
{
    for(let i=0;i<rows;i++)
    {
        for(let j=0;j<col;j++)
        {
            let cell= document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);
            cell.click();
        }
    }
    let firstCell=document.querySelector(".cell");
firstCell.click();
}
function handleSheetUi(sheet)
{
    let allcells=document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allcells.length;i++)
    {
        allcells[i].style.backgroundColor="transparent";   
    }
    sheet.style.backgroundColor="#ced6e0"
}
function handleSheetActiveness(sheet)
{
sheet.addEventListener("click",(e)=>{
    let sheetIndex=Number(sheet.getAttribute("id"));
    handleSheetDb(sheetIndex);
    handleGraphDb(sheetIndex);
    handleSheetProperties();  
    handleSheetUi(sheet);
})
}
function createSheetDb()
{
    let sheetDB=[];
for(let i=0;i<rows;i++)
{
    let sheetRow=[];
    for(let j=0;j<col;j++)
    {
        let cellProp={
            bold:false,
            italic:false,
            underlined:false,
            alignment:"left",
            fontFamily:"monospace",
            fontSize:14,
            color:"#000000",
            bgColor:"#000000",
            value:"" ,
            formula:"",
            children:[]
        }
        sheetRow.push(cellProp);
    }
    sheetDB.push(sheetRow);
}
collectedSheetDb.push(sheetDB);
}
function createGraphComponentMatrix()
{
    let graphComponentMatrix=[];
for( let i=0;i< rows;i++)
{
    let row=[];
    for( let j=0;j<col;j++)
    {

        row.push([]);
    }
    graphComponentMatrix.push(row);
}
collectedGraphComponent.push(graphComponentMatrix);
}
