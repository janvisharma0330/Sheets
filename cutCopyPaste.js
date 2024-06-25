let ctrlKey;
let copyBtn=document.querySelector(".copy");
let cutBtn=document.querySelector(".cut");
let pasteBtn=document.querySelector(".paste");

document.addEventListener("keydown",(e)=>
{
ctrlKey=e.ctrlKey;
})
document.addEventListener("keyup",(e)=>
{
ctrlKey=e.ctrlKey;
})
for(let i=0;i<rows;i++)
{
    for(let j=0;j<col;j++)
    {
        let cell= document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);
        handleSelectedCells(cell);   
    }
}
let rangeStorage=[]; 
function handleSelectedCells(cell)
{
    cell.addEventListener("click",(e)=>
    {
        if(!ctrlKey) return;
        if(rangeStorage.length>=2) 
        {
            defaultSelectedCells();
            rangeStorage=[];
        }
        cell.style.border= "3px solid #218c74";
        let rid=Number(cell.getAttribute("rowid"));
        let cid=Number(cell.getAttribute("colid"));
        rangeStorage.push([rid,cid]);
    })
}
function defaultSelectedCells()
{
    for(let i=0;i<rangeStorage.length;i++)
    {
        let cell= document.querySelector(`.cell[rowid="${rangeStorage[i][0]}"][colid="${rangeStorage[i][1]}"]`);
        cell.style.border="1px solid lightgrey";
    }
}
let copyData=[];
copyBtn.addEventListener("click",(e)=>
{
    if(rangeStorage.length<2) return;
    copyData=[];
for(let i=rangeStorage[0][0];i<=rangeStorage[1][0];i++)
{
    let copyRow=[];
    for(let j=rangeStorage[0][1];j<=rangeStorage[1][1];j++)
    {
        let cellProp=sheetDB[i][j];
        copyRow.push(cellProp);
    }
    copyData.push(copyRow);
}
console.log(copyData);
defaultSelectedCells(); 
})
cutBtn.addEventListener("click", (e) => {
    if (rangeStorage.length < 2) return;

    let [strow, stcol, endrow, endcol] = [ rangeStorage[0][0], rangeStorage[0][1], rangeStorage[1][0], rangeStorage[1][1] ];

    for (let i = strow;i <= endrow;i++) {
        for (let j = stcol;j <= endcol;j++) {
            let cell = document.querySelector(`.cell[rowid="${i}"][colid="${j}"]`);

            // DB
            let cellProp = sheetDB[i][j];
            cellProp.value = "";
            cellProp.bold = false;
            cellProp.italic = false;
            cellProp.underline = false;
            cellProp.fontSize = 14;
            cellProp.fontFamily = "monospace";
            cellProp.fontColor = "#000000";
            cellProp.BGcolor = "#000000";
            cellProp.alignment = "left";

            // UI
            cell.click();
        }
    }

    defaultSelectedCells();
})
pasteBtn.addEventListener("click",(e)=>
{
    if(rangeStorage.length<2) return;
    let addressbar=document.querySelector(".address-bar");
    let address=addressbar.value; 
    let[tsrow,tscol]=decode(address);
    let rowDiff=Math.abs(rangeStorage[1][0]-rangeStorage[0][0]);
    let colDiff=Math.abs(rangeStorage[1][1]-rangeStorage[0][1]);
    let r=0;
    for(let row=tsrow;row<=tsrow+rowDiff;row++)
    {    
        let c=0;
        for(let col=tscol;col<=tscol+colDiff;col++)
        {
            let cell= document.querySelector(`.cell[rowid="${row}"][colid="${col}"]`);
            if(!cell) continue;
            let data=copyData[r][c];
            let cellProp=sheetDB[row][col];
            cellProp.value=data.value;
            cellProp.bold=data.bold;
            cellProp.italic=data.italic;
            cellProp.alignment=data.alignment;
            cellProp.underlined=data.underlined;
            cellProp.fontFamily=data.fontFamily;
            cellProp.fontSize=data.fontSize;
            cellProp.color=data.color;
            cellProp.bgColor=data.bgColor;
            cell.click();
            c++;
        }
        r++;
    }
})
