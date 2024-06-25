let rows=100;
let col=26;
let addressColCont=document.querySelector(".address-col-cont")
for(let i=0;i<rows;i++)
{
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","addressCol");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);
}
let addressRowCont=document.querySelector(".address-row-cont");
for(let i=0;i<26;i++)
{
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","addressRow");
    addressRow.innerText=String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);
}
let gridCont=document.querySelector(".grid-cont");
let addressbar=document.querySelector(".address-bar");
for(let i=0;i<100;i++)
{
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","rowCont");
    for(let j=0;j<26;j++)
    {
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        cell.setAttribute("rowid",i);
        cell.setAttribute("colid",j);
        rowCont.appendChild(cell);
        displayAddress(cell, i ,j);
    }
    gridCont.appendChild(rowCont);
}
function displayAddress(cell ,i ,j)
{
    cell.addEventListener("click", ()=>{
        let rowid=i+1;
        let colid=String.fromCharCode(65+j);
        addressbar.value = `${colid}${rowid}`;
    })
}
